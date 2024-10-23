import { selectCurrentPlayer, selectGameState, selectIsDealer, selectTimer } from '../selector/game';
import { WebSocketEventType } from '../../api/src/constant/websocket-event.enum';
import { call, delay, select, take, takeEvery } from 'typed-redux-saga';
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { GameStage } from '../../api/src/constant/game-stage.enum';
import { TimerType, CookieType } from '../../api/src/type';
import { Saga } from '../../type/framework/core/CoreSaga';
import { GameAction } from '../action/game.action';
import { PayloadAction } from '@reduxjs/toolkit';
import { Socket, io } from 'socket.io-client';
import { takePayload } from '../SagaHelper';
import { eventChannel } from 'redux-saga';
import { sagaDispatch } from '..';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { Env } from '@app/Env';


let socket: Socket | null = null;

const CountdownTimerDurationSeconds = Env.getValue<number>('NEXT_PUBLIC_NEXT_COUNTDOWN_TIMER_DURATION_SECONDS');

// skip initalizing the websocket when building or running tests
if (!Env.isBuilding() && !Env.isTest()) {

    // const origin = 'https://crude-cards-api-service-326275095555.us-west1.run.app';
    const origin = Env.getValue<string>('NEXT_PUBLIC_WEB_SOCKET_HOST_ORIGIN');

    console.log('Connecting to WebSocket:', origin);

    socket = io(origin, {
        withCredentials : true,
        auth            : {
            AuthToken : Cookies.get(CookieType.AuthToken),
        },
    });
}

if (socket)
    socket.on('connect', () => {
        console.log('Client WebSocket Connected');

        socket.on('connect_error', (error: Error) => {
            if (socket.active)
                console.log('Reconnecting WebSocket...');
            else
                console.log('connect_error', error.message);
        });

        socket.on(WebSocketEventType.UpdatePlayerValidation, (validation: string) => {
            console.log('CLIENT GOT: validation', validation);

            Cookies.set(CookieType.AuthToken, validation);
        });
    });


// this function creates an event channel from a given socket
// Setup subscription to incoming update events
export function createGameUpdateReceiverSagaChannel(socket : Socket) {
    console.log('createGameUpdateReceiverSagaChannel ');

    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel(emit => {

        socket.on(WebSocketEventType.UpdateGame,
            (gameState : GameStateDTO) =>
                emit(gameState),
        );

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            socket.off(WebSocketEventType.UpdateGame);
        }

        return unsubscribe
    })
}

// All this does is listen, no sending
function* sagaStartUpdateListener(): Saga {
    if (!socket)
        return;

    console.log('sagaStartUpdateListener started');

    // listen and respond only to GameUpdate events pushed from the server

    const channelGameUpdateListener = yield* call(
        createGameUpdateReceiverSagaChannel, socket);

    console.log('Socket channel created');

    while (true) {

        let previousGameState = yield* select(selectGameState);
        console.log('Initial game state:', previousGameState);

        console.log('Waiting for new game state...');
        const newGameState = (yield* take(channelGameUpdateListener)) as GameStateDTO;

        console.log('New game state received:', newGameState);
        const newGameStateString = JSON.stringify(newGameState);

        yield* sagaDispatch(GameAction.updateGameState(newGameStateString));

        // This can happen when the server is disconnecting a player
        if(newGameState.new_auth_token) {
            console.log('New Auth Token Received in Game Update', newGameState.new_auth_token);
            Cookies.set(CookieType.AuthToken, newGameState.new_auth_token);
        }

        if(newGameState.game_stage === GameStage.Home) {
            console.log('Game stage is Home, clearing game code from url');
            Router.push('/');
        }

        console.log('Game State Updated, checking timers');

        if (newGameState.game_stage == previousGameState.game_stage) {
            console.log(`State didn't change from ${newGameState.game_stage}, skipping timer`);
            continue;
        }

        // On any page but the homepage, put the game code in the url
        if(newGameState.game_stage !== GameStage.Home) {
            console.log(`Non homepage stage, updating url with game code $newGameState.game_stage}`);
            Router.push(`/game/${newGameState.game_code}`);
        }

        console.log(`State changed to ${newGameState.game_stage}, updating timer`);
        yield* sagaDispatch(GameAction.updateTimer({
            timerType : null,
            timeLeft  : 0,
        }));

        const isDealer = yield* select(selectIsDealer);
        console.log('Is dealer:', isDealer);

        switch (newGameState.game_stage) {
            case GameStage.DealerPickBlackCard: {
                console.log('Game stage: DealerPickBlackCard');

                if (isDealer) {
                    console.log('Starting timer for DealerPickBlackCard');

                    yield* sagaDispatch(GameAction.updateTimer({
                        timerType : TimerType.DealerPickBlackCard,
                        timeLeft  : CountdownTimerDurationSeconds,
                    }));
                }
            } break;

            case GameStage.PlayerPickWhiteCard: {
                console.log('Game stage: PlayerPickWhiteCard');

                yield* sagaDispatch(GameAction.updateTimer({
                    timerType : TimerType.PlayerSelectWhiteCard,
                    timeLeft  : CountdownTimerDurationSeconds,
                }));
            } break;

            case GameStage.DealerPickWinner: {
                console.log('Game stage: DealerPickWinner');

                if (isDealer) {
                    console.log('Starting timer for DealerPickWinner');
                    yield* sagaDispatch(GameAction.updateTimer({
                        timerType : TimerType.DealerPickWinner,
                        timeLeft  : CountdownTimerDurationSeconds,
                    }));
                }
            } break;

            default: {
                console.log('Noop game stage for timers:', newGameState.game_stage);
            }
        }

        previousGameState = newGameState;

        console.log('Previous game state updated:', previousGameState);
    }
}


// eslint-disable-next-line require-yield
function* onSendWebSocketMessage(
    action : PayloadAction<Record<string, unknown>>,
) : Saga {
    console.log('Received an Action to Send a WebSocket Message', action);

    if(!socket) {
        console.error('No socket available');

        return;
    }

    // puggyback the auth token onto every websocket request.
    // Again, this probably should be handled via JWTs of something
    const auth_token = Cookies.get(CookieType.AuthToken);

    console.log('Auth Token:', auth_token);

    const payload = action.payload as Record<string, unknown>;

    // if there's already a game code in the action, use it. For instance when
    // a player joins a game, the game code is what they type.

    const game_code =
        // if game_code was included in the payload, prioritize it over the url
        payload['game_code']?.toString()
        || Router.query['gameCode']?.toString()
        || null; // todo: Use Standard Error String or something

    // todo: add runtimeContext
    const socketPayload = {
        ...action.payload as Record<string, unknown>,
        auth_token,
        game_code,
    };

    // Pew pew pew!
    console.log(socketPayload);

    socket.emit(action.type, socketPayload);
}

// Double check this logic, i think its fallen out of date
// and might be spawning lots of listeners., ideally get rid o this
// and just use the relay channel

function* sagaSendWebSocketMessage(): Saga {
    yield* takeEvery([
        GameAction.dealerPickBlackCard,
        GameAction.playerSelectCard,
        GameAction.dealerPickWinner,
        GameAction.updateUsername,
        GameAction.submitFeedback,
        GameAction.createGame,
        GameAction.startGame,
        GameAction.leaveGame,
        GameAction.joinGame,
        GameAction.nextHand,
        GameAction.logRelay,
    ], onSendWebSocketMessage);
}


function* sagaStartTimer(): Saga {

    let timer = yield* select(selectTimer);

    while (true) {
        yield delay(1000);

        timer = yield* select(selectTimer);

        if (!timer.timerType) continue;

        if (timer.timeLeft <= 0) {

            yield* sagaDispatch(GameAction.updateTimer({
                timerType : null,
                timeLeft  : 0,
            }));

            yield* sagaDispatch(GameAction.timerComplete({
                timerType : timer.timerType,
            }));

            continue;
        }

        yield* sagaDispatch(GameAction.updateTimer({
            ...timer,
            timeLeft : timer.timeLeft - 1,
        }));
    }
}

function* sagaTimerComplete(): Saga {

    const timerComplete = yield* takePayload(GameAction.timerComplete);

    const currentPlayer = yield* select(selectCurrentPlayer);
    const isDealer = yield* select(selectIsDealer);
    const game = yield* select(selectGameState);

    switch (timerComplete.timerType) {
        case TimerType.DealerPickBlackCard: {
            if (isDealer)
                yield* sagaDispatch(GameAction.dealerPickBlackCard({
                    card_id : game.dealer_card_id_list[0],
                }));
        } break;

        case TimerType.PlayerSelectWhiteCard: {
            if (!isDealer)
                yield* sagaDispatch(GameAction.playerSelectCard({
                    card_id : currentPlayer?.card_id_list[0] ?? null,
                }));
        } break;

        case TimerType.DealerPickWinner: {
            if (isDealer)
                yield* sagaDispatch(GameAction.dealerPickWinner({
                    card_id : game.selected_card_id_list[0],
                }));
        } break;
    }
}


export const WebSocks = {
    sagaSendWebSocketMessage,
    sagaStartUpdateListener,
    sagaTimerComplete,
    sagaStartTimer,

    *[Symbol.iterator]() {
        yield this.sagaSendWebSocketMessage;
        yield this.sagaStartUpdateListener;
        yield this.sagaTimerComplete;
        yield this.sagaStartTimer;
    },
};

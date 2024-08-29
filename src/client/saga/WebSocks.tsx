import { selectCurrentPlayer, selectGameState, selectIsDealer, selectTimer } from '../selector/game';
import { WebSocketEventType } from '../../api/src/constant/websocket-event.enum';
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { GameStage } from '../../api/src/constant/game-stage.enum';
import { call, delay, select, take } from 'typed-redux-saga';
import { TimerType, CookieType } from '../../api/src/type';
import { Saga } from '../../type/framework/core/CoreSaga';
import { createSocketChannel } from './channel';
import { Socket, io } from 'socket.io-client';
import { GameAction } from '../action/game';
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
            // debugger;
            console.log('CLIENT GOT: validation', validation);

            Cookies.set(CookieType.AuthToken, validation);
        });
    });


function* sagaStartUpdateListener(): Saga {
    if (!socket)
        return;

    console.log('sagaStartUpdateListener started');

    const socketChannel = yield* call(createSocketChannel, socket);
    console.log('Socket channel created');

    let previousGameState = yield* select(selectGameState);
    console.log('Initial game state:', previousGameState);

    while (true) {

        console.log('Waiting for new game state...');

        const newGameState = (yield* take(socketChannel)) as GameStateDTO;

        console.log('New game state received:', newGameState);

        const newGameStateString = JSON.stringify(newGameState);

        yield* sagaDispatch(GameAction.updateGameState(newGameStateString));

        console.log('Game State Updated, checking timers');

        if (newGameState.game_stage == previousGameState.game_stage) {
            console.log(`State didn't change from ${newGameState.game_stage}, skipping timer`);
            continue;
        }

        // On any page but the homepage, put the game code
        // in the url

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


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function socketChannelRelay(
    socket: Socket,
    messageType: string,
    messageData: unknown,
) {
    const auth_token = Cookies.get(CookieType.AuthToken)
    const game_code = Router.query['game_code'] || Router.query['gameCode'];

    const message = {
        ...messageData as Record<string, unknown>,
        auth_token,
        game_code,
    };

    console.log('Sending WS Message to Server', auth_token, messageType, message, game_code);

    return eventChannel(emit => {
        socket.emit(
            messageType,
            message,
            (gameState: GameStateDTO) =>
                emit(gameState));

        return () => {
            console.log('Socket channel closed');
        };
    });
}

// Double check this logic, i think its fallen out of date
// and might be spawning lots of listeners., ideally get rid o this
// and just use the relay channel

function* sagaSendWebSocketMessage(): Saga {

    const message = yield* takePayload(GameAction.sendWebSocketMessage);

    if (!socket) return;

    const socketChannel = yield* call(
        socketChannelRelay, socket,
        message.type, message.data,
    );

    yield* take(socketChannel);

    socketChannel.close();
}

function* sagaReconnect(): Saga {

    // Cookies

    // placeholder
    yield* takePayload(GameAction.dealerPickWinner)
}


function* sagaCreateGame(): Saga {
    yield* sagaDispatch(GameAction.sendWebSocketMessage({
        type : WebSocketEventType.CreateGame,
        data : yield* takePayload(GameAction.createGame),
    }));
}

function* sagaDealerPickBlackCard(): Saga {
    yield* sagaDispatch(GameAction.sendWebSocketMessage({
        type : WebSocketEventType.DealerPickBlackCard,
        data : yield* takePayload(GameAction.dealerPickBlackCard),
    }));
}

function* sagaStartGame(): Saga {
    yield* sagaDispatch(GameAction.sendWebSocketMessage({
        type : WebSocketEventType.StartGame,
        data : yield* takePayload(GameAction.startGame),
    }));
}

function* sagaJoinGame(): Saga {
    yield* sagaDispatch(GameAction.sendWebSocketMessage({
        type : WebSocketEventType.JoinGame,
        data : yield* takePayload(GameAction.joinGame),
    }));
}

function* sagaPlayerSelectCard(): Saga {
    yield* sagaDispatch(GameAction.sendWebSocketMessage({
        type : WebSocketEventType.PlayerSelectCard,
        data : yield* takePayload(GameAction.playerSelectCard),
    }));
}

function* sagaDealerPickWinner(): Saga {
    yield* sagaDispatch(GameAction.sendWebSocketMessage({
        type : WebSocketEventType.DealerPickWinner,
        data : yield* takePayload(GameAction.dealerPickWinner),
    }));
}

function* sagaNextHand(): Saga {
    yield* sagaDispatch(GameAction.sendWebSocketMessage({
        type : WebSocketEventType.NextHand,
        data : yield* takePayload(GameAction.nextHand),
    }));
}

function* sagaUpdateUsername(): Saga {
    yield* sagaDispatch(GameAction.sendWebSocketMessage({
        type : WebSocketEventType.UpdateUsername,
        data : yield* takePayload(GameAction.updateUsername),
    }));
}

function* sagaExitGame(): Saga {
    const exitGame = yield* takePayload(GameAction.exitGame)

    Router.push('/');

    yield* sagaDispatch(GameAction.sendWebSocketMessage({
        type : WebSocketEventType.ExitGame,
        data : exitGame,
    }));
}

function* sagaFeedback(): Saga {
    yield* sagaDispatch(GameAction.sendWebSocketMessage({
        type : WebSocketEventType.SubmitFeedback,
        data : yield* takePayload(GameAction.submitFeedback),
    }));
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
    sagaDealerPickBlackCard,
    sagaPlayerSelectCard,
    sagaDealerPickWinner,
    sagaUpdateUsername,
    sagaTimerComplete,
    sagaStartTimer,
    sagaCreateGame,
    sagaStartGame,
    sagaReconnect,
    sagaFeedback,
    sagaNextHand,
    sagaJoinGame,
    sagaExitGame,

    *[Symbol.iterator]() {
        yield this.sagaSendWebSocketMessage;
        yield this.sagaStartUpdateListener;
        yield this.sagaDealerPickBlackCard;
        yield this.sagaPlayerSelectCard;
        yield this.sagaDealerPickWinner;
        yield this.sagaUpdateUsername;
        yield this.sagaTimerComplete;
        yield this.sagaStartTimer;
        yield this.sagaCreateGame;
        yield this.sagaStartGame;
        yield this.sagaReconnect;
        yield this.sagaFeedback;
        yield this.sagaNextHand;
        yield this.sagaJoinGame;
        yield this.sagaExitGame;
    },
};
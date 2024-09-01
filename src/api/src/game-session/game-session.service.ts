import { ArrayContains, IsNull, Not, Repository } from 'typeorm';
import { ScoreLog } from '../score-log/score-log.entity';
import { GameStage } from '../constant/game-stage.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GameSession } from './game-session.entity';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { P } from '../../../type/framework/data/P';
import { Player } from '../player/player.entity';
import { WsException } from '@nestjs/websockets';
import { Game } from '../game/game.entity';
import { Logger } from 'winston';

import { JoinGameReason, GameExitReason } from '../type';


@Injectable()
export class GameSessionService {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @InjectRepository(GameSession)
        private readonly gameSessionRepo: Repository<GameSession>,
    ) { }

    /**
     * Whatever game session the player is in, remove them from it
     *
     * @param currentPlayer - The player to remove from the session
     * @param session - The session to remove the player from
     * @param exitReason - The reason the player is being removed
     *
     * @returns - The updated session with the player in the exited list
     */
    public exitActiveGameSession = async (
        currentPlayer: Player,
        exitReason: GameExitReason,
        runtimeContext: string = '') => {

        const prefix = 'GameSessionService::leaveOpenSession';

        this.log.silly(prefix, { currentPlayer, runtimeContext });

        const session = await this.findActivePlayerGameSession(currentPlayer);

        if (!session) {
            this.log.info(`${prefix}::NoSessionFound - NoOp`, { currentPlayer, runtimeContext });

            return;
        }

        this.log.info(`${prefix} Found a session, removing player`, {
            currentPlayer, exitReason, session,
        });

        return this.removePlayerFromSession(
            currentPlayer,
            session,
            exitReason,
            'Found player in a session, removing them.');
    };


    /**
     * Determines the reason a player is joining a game session.
     *
     * @param player - The player attempting to join the game.
     * @param session - The current game session.
     *
     * @returns The reason the player is joining the game.
     */
    private getJoinGameReason = (
        player: Player, session: GameSession,
    ): JoinGameReason => {
        const {
            exited_player_id_list,
            limbo_player_id_list,
            player_id_list,
        } = session;

        const playerId = player.id;

        // NEW GAME AND PLAYER
        // Joined Pregame Lobby
        // IF: The game is in lobby mode still before the game has started.
        // ACTION: Add player to the player_id_list and emit the
        // updated session to all players in the session.
        if (session.game_stage === GameStage.Lobby
            && !player_id_list.includes(playerId))
            return JoinGameReason.NewGameAndPlayer;

        // PLAYER FAST REFRESH
        // Fast Reconnect / Page Refresh
        // IF: The player is reconnecting and the game doesn't realize they were even
        // gone. Means disconnect didnt' go through as expected (hence the possible
        // reason for the disconnect) they they rapidly joined back before any timers
        // moved them into disconnected state. Means they exist in the player_id_list,
        // but not in the exited_player_id_list or limbo_player_id_list
        // ACTION: Check the game session and ensure their player_id is only in
        // the player_id_list and not in the exited_player_id_list or limbo_player_id_list
        // and the game should continue as if nothing happened from other players
        // perspective. The current user may have just refreshed their browser or lost
        // connection, server crash whatever the case may be. Should broadcase to all
        // players (though ther may be an efficiency gain by skipping other players,
        // nothing should have changed for them)
        if (player_id_list.includes(playerId)
            && !exited_player_id_list.includes(playerId)
            && !limbo_player_id_list.includes(playerId))
            return JoinGameReason.PlayerFastRefresh;


        // Joining Player is Already in Limbo
        // IF: If they are listed in the limbo_player_id_list and
        // are NOT in exited_player_id_list, then they're
        // joinged as a new player while the game is already in progress and
        // were put into limbo previously. This could happen if they
        // were in limbo and refreshed the page or rejoined the game multiple
        // times as the same user
        // ACTION: do nothing. Could happen if they are in limbo and refresh,
        // they should just stay there. Emit update to players
        if (limbo_player_id_list.includes(playerId)
            && !exited_player_id_list.includes(playerId))
            return JoinGameReason.JoiningPlayerIsAlreadyInLimbo;


        // Reconnecting Disconnected Player
        // IF: They are listed in the exited_player_id_list, then
        // they were disconnected and the server properly registerd the
        // disconnnect, and the players were notified with updated state
        // reflecting the dicsconnected player.
        // ACTION: Remove them from the exited_player_id_list.
        // The player_id_list has all players, so just removing it from
        // disconnected reconnectes them to the session. Joining players
        // who were previously disconnected properly should be
        // added back automatically. They skip limbo since they're
        // already known to be in the game and are dealt in.
        if (exited_player_id_list.includes(playerId))
            return JoinGameReason.ReconnectingDisconnectedPlayer;


        // PLAYER IS ALREADY IN GAME
        // IF: The player joining is already in this game and
        // their player_id is NOT in exited_player_id_list
        // AND NOT in limbo_player_id_list. So they're just an active
        // player already but a joing game request was sent.
        // ACTION: Do nothing, they are already in the game so noop.
        // Emit update to players, but possibly not necessary.
        if (player_id_list.includes(playerId)
            && !exited_player_id_list.includes(playerId)
            && !limbo_player_id_list.includes(playerId))
            return JoinGameReason.PlayerIsAlreadyInGame;


        // PLAYER JOINS MIDGAME
        // IF: The new player is unknown to the current game session and
        // the game has already started (no longer in lobby mode). They are
        // joining late and have not been dealt in yet.
        // ACTION: Add their player_id to the limbo_player_id_list
        // and emit the updated session to all players in the session.
        // Once the current hand ends, they will be dealt in. Later
        // on, it will have "Admit / Ignore / Ban" etc options to
        // allow players to optionally let players in limbo into the game [idea].
        if (!player_id_list.includes(playerId)
            && session.game_stage !== GameStage.Lobby)
            return JoinGameReason.PlayerJoinsMidGame;


        // Additional Cases
        // 1. Player Attempts to Join a Full Game
        // 2. Player Attempts to Join a Banned Session

        // Default case if none of the above match
        return JoinGameReason.JoiningPlayerIsAlreadyInLimbo;
    }

    /**
     * Get all active game sessions this player is tied to
     *
     * @param player - The player to get the active game sessions for
     * @param session - The session to exclude from the list
     *
     * @returns - The list of active game sessions
     */
    public getActiveGameSessionList = async (
        player: Player, session: GameSession,
    ) => {
        const stageAndId = {
            game_stage : Not(GameStage.GameComplete),
            id         : Not(session.id),
        };

        const playerIdArray = ArrayContains([player.id]);

        return this.gameSessionRepo.find({
            where : [{
                exited_player_id_list : playerIdArray,
                ...stageAndId,
            }, {
                limbo_player_id_list : playerIdArray,
                ...stageAndId,
            }, {
                player_id_list : playerIdArray,
                ...stageAndId,
            }],
        });
    }

    /**
     *  Adds a player to a game session
     *
     * @param player   - The player to add to the session
     * @param session  - The session to add the player to
     * @param runtimeContext - Additional context for debugging
     *
     * @returns void
     */
    public setPlayerGameSession = async (
        player: Player, session: GameSession, runtimeContext: string = '',
    ): P<unknown> => {
        this.log.silly('GameSessionService::addPlayerToSession', { player, session, runtimeContext });

        // Find all active game sessions this player is tied to and
        // remove them, except for the session we're adding outselves to.
        const activeGameSessionList = await this.getActiveGameSessionList(player, session);

        // Removes player from any active session aside
        // from the one we're joining
        await Promise.all(
            activeGameSessionList.map(async activeSession =>
                this.removePlayerFromSession(player, activeSession,
                    GameExitReason.JoiningOther, // TODO - doesnt make sense, can tell proper context
                    `Removing player from any active session` + runtimeContext)));

        const joinGameState = this.getJoinGameReason(player, session);

        switch (joinGameState) {
            case JoinGameReason.ReconnectingDisconnectedPlayer:
                return this.joinGameViaReconnectingDisconnectedPlayer(player, session,
                    'Reconnecting disconnected player' + runtimeContext);

            case JoinGameReason.JoiningPlayerIsAlreadyInLimbo:
                return this.joinGameViaJoiningPlayerIsAlreadyInLimbo(player, session,
                    'Joining player is already in limbo' + runtimeContext);

            case JoinGameReason.PlayerIsAlreadyInGame:
                return this.joinGameViaPlayerIsAlreadyInGame(player, session,
                    'Player is already in the game' + runtimeContext);

            case JoinGameReason.PlayerJoinsMidGame:
                return this.joinGameViaPlayerJoinsMidGame(player, session,
                    'Player joins midgame' + runtimeContext);

            case JoinGameReason.PlayerFastRefresh:
                return this.joinGameViaPlayerFastRefresh(player, session,
                    'Player fast refresh' + runtimeContext);

            case JoinGameReason.NewGameAndPlayer:
                return this.joinGameViaNewGameAndPlayer(player, session,
                    'New game and player' + runtimeContext);

            default: throw new WsException(`Invalid Join Game Scenario ${joinGameState} - ` + runtimeContext);
        }
    }

    // Reconnecting Disconnected Player
    // IF: They are listed in the exited_player_id_list, then
    // they were disconnected and the server properly registerd the
    // disconnnect, and the players were notified with updated state
    // reflecting the dicsconnected player.
    // ACTION: Remove them from the exited_player_id_list.
    // The player_id_list has all players, so just removing it from
    // disconnected reconnectes them to the session. Joining players
    // who were previously disconnected properly should be
    // added back automatically. They skip limbo since they're
    // already known to be in the game and are dealt in.
    private joinGameViaReconnectingDisconnectedPlayer = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {
        debugger;

        const debugBundle = { player, session, runtimeContext };

        const debugText = `runtimeContext(${runtimeContext}) playerId(${player.id}) sessionId(${session.id})`;

        this.log.silly('GameSessionService::DisconnectedPlayer', { debugBundle });

        if (!session.exited_player_id_list.includes(player.id)) {
            this.log.error(`DisconnectedPlayer::player - Player is not in the disconnected list`, { debugBundle });
            throw new WsException(`DisconnectedPlayer::player ${debugBundle}`);
        }

        if (session.limbo_player_id_list.includes(player.id)) {
            this.log.error(`DisconnectedPlayer::limbo - Player is in limbo`, { debugBundle });
            throw new WsException(`DisconnectedPlayer::limbo ${debugText}`);
        }

        if (session.player_id_list.includes(player.id)) {
            this.log.error(`DisconnectedPlayer::player - Player is in disconnect, but not in player list.`, { debugBundle });
            throw new WsException(`DisconnectedPlayer::player ${debugText}`);
        }

        this.log.info('Reconnecting Disconnected Player', { debugBundle });

        // just remove from the disconnected player array,
        // they are already in the player_list
        return this.gameSessionRepo.update(session.id, {
            ...session,
            exited_player_id_list : () =>
                `array_remove(exited_player_id_list, '${player.id}')`,
        });
    };

    // Joining Player is Already in Limbo
    // IF: If they are listed in the limbo_player_id_list and
    // are NOT in exited_player_id_list, then they're
    // joinged as a new player while the game is already in progress and
    // were put into limbo previously. This could happen if they
    // were in limbo and refreshed the page or rejoined the game multiple
    // times as the same user
    // ACTION: do nothing. Could happen if they are in limbo and refresh,
    // they should just stay there. Emit update to players
    private joinGameViaJoiningPlayerIsAlreadyInLimbo = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {
        const debugBundle = { player, session, runtimeContext };

        this.log.silly('GameSessionService::joinGameViaJoiningPlayerIsAlreadyInLimbo', { debugBundle });

        return this.log.debug('Player is already in limbo, no action required', { debugBundle });
    };

    // PLAYER IS ALREADY IN GAME
    // IF: The player joining is already in this game and
    // their player_id is NOT in exited_player_id_list
    // AND NOT in limbo_player_id_list. So they're just an active
    // player already but a joing game request was sent.
    // ACTION: Do nothing, they are already in the game so noop.
    // Emit update to players, but possibly not necessary.
    private joinGameViaPlayerIsAlreadyInGame = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {
        const debugBundle = { player, session, runtimeContext };
        const debugText = `runtimeContext(${runtimeContext}) playerId(${player.id}) sessionId(${session.id})`;

        this.log.silly('GameSessionService::joinGameViaPlayerIsAlreadyInGame', { debugBundle });

        if (session.exited_player_id_list.includes(player.id)) {
            this.log.error(`playerIsAlreadyInGame::disconnected - Incorrect Flow`, { debugBundle });
            throw new WsException(`playerIsAlreadyInGame::disconnected debugText(${debugText})`);
        }

        if (session.limbo_player_id_list.includes(player.id)) {
            this.log.error(`playerIsAlreadyInGame::limbo - Incorrect Flow`, { debugBundle });
            throw new WsException(`playerIsAlreadyInGame::limbo debugText(${debugText})`);
        }

        if (!session.player_id_list.includes(player.id)) {
            this.log.error(`playerIsAlreadyInGame::player - Player isn't in this game debugText(${debugText})`, { debugBundle });
            throw new WsException(`playerIsAlreadyInGame::player debugText(${debugText})`);
        }

        return this.log.info('Player is already in the game, no action required', { debugBundle });
    };

    // PLAYER JOINS MIDGAME
    // IF: The new player is unknown to the current game session and
    // the game has already started (no longer in lobby mode). They are
    // joining late and have not been dealt in yet.
    // ACTION: Add their player_id to the limbo_player_id_list
    // and emit the updated session to all players in the session.
    // Once the current hand ends, they will be dealt in. Later
    // on, it will have "Admit / Ignore / Ban" etc options to
    // allow players to optionally let players in limbo into the game [idea].
    private joinGameViaPlayerJoinsMidGame = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {

        const debugBundle = { player, session, runtimeContext };
        const debugText = `runtimeContext(${runtimeContext} playerId(${player.id}) sessionId(${session.id})`;

        this.log.silly('GameSessionService::joinGameViaPlayerJoinsMidGame', { debugBundle });

        const { limbo_player_id_list, player_id_list } = session;

        // players in limbo
        if (player_id_list.includes(player.id)) {
            this.log.error(`playerJoinsMidGame::player - Player is already in the game`, { debugBundle });
            throw new WsException(`playerJoinsMidGame::player (${debugText})`);
        }

        if (limbo_player_id_list.includes(player.id)) {
            // Not throwing an error here, because they could have been midgame,
            // left, some back migame of another hand, so they just remain in limbo
            this.log.info(`playerJoinsMidGame::limbo - Player is already in limbo`, { debugBundle });

            return;
        }

        return this.gameSessionRepo.update(session.id, {
            ...session,
            limbo_player_id_list : () =>
                `array_append(array_remove(limbo_player_id_list, '${player.id}'), '${player.id}')`,
        });
    };

    // PLAYER FAST REFRESH
    // Fast Reconnect / Page Refresh
    // IF: The player is reconnecting and the game doesn't realize they were even
    // gone. Means disconnect didnt' go through as expected (hence the possible
    // reason for the disconnect) they they rapidly joined back before any timers
    // moved them into disconnected state. Means they exist in the player_id_list,
    // but not in the exited_player_id_list or limbo_player_id_list
    // ACTION: Check the game session and ensure their player_id is only in
    // the player_id_list and not in the exited_player_id_list or limbo_player_id_list
    // and the game should continue as if nothing happened from other players
    // perspective. The current user may have just refreshed their browser or lost
    // connection, server crash whatever the case may be. Should broadcase to all
    // players (though ther may be an efficiency gain by skipping other players,
    // nothing should have changed for them)
    private joinGameViaPlayerFastRefresh = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {
        const debugBundle = { player, session, runtimeContext };

        this.log.silly('GameSessionService::joinGameViaPlayerFastRefresh', { debugBundle });

        const {
            exited_player_id_list, limbo_player_id_list, player_id_list,
        } = session;

        const debugText = `playerId(${player.id}) sessionId(${session.id})`;

        if (exited_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::disconnected - Incorrect Flow`, { debugBundle });
            throw new WsException(`playerFastRefresh::disconnected (${debugText})`);
        }
        if (limbo_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::limbo - Already In Limbo`, { debugBundle });
            throw new WsException(`playerFastRefresh::limbo (${debugText})`);
        }

        if (!player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::player - Player isn't in this game`, { debugBundle });
            throw new WsException(`playerFastRefresh::player (${debugText})`);
        }

        this.log.debug('Valid Fast Refresh Detected, Doin Nothin At All. Nothin at All.', { debugBundle });

        // fast refreshes are noops and other players shouldnt notice
        return;
    };

    // NEW GAME AND PLAYER
    // Joined Pregame Lobby
    // IF: The game is in lobby mode still before the game has started.
    // ACTION: Add player to the player_id_list and emit the
    // updated session to all players in the session.
    private joinGameViaNewGameAndPlayer = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {

        const debugBundle = { player, session, runtimeContext };

        this.log.silly('GameSessionService::joinGameViaNewGameAndPlayer', { debugBundle });

        // ensure there's only one copy of the playerid by
        // attempting to remove one of the same name before
        // appending it to the list

        const {
            exited_player_id_list, limbo_player_id_list, player_id_list,
        } = session;

        const debugText = `runtimeContext(${runtimeContext}) playerId(${player.id}) sessionId(${session.id})`;

        if (exited_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::disconnected -  Client previously disconnected, incorrect flow.`, { debugBundle });
            throw new WsException(`playerFastRefresh::disconnected (${debugText})`);
        }

        if (limbo_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::limbo - Already in Limbo.`, { debugBundle });
            throw new WsException(`playerFastRefresh::limbo (${debugText})`);
        }

        // player is not already in the game
        if (player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::player - Already in Session Player List, NoOp.`, { debugBundle });

            return;
        }

        this.log.debug('Adding Player to Game Session', { debugBundle });

        return this.gameSessionRepo.update(session.id, {
            ...session,
            player_id_list : () =>
                `array_append(array_remove(player_id_list, '${player.id}'), '${player.id}')`,
        });
    };

    /**
     * Initialize a new game session. This is called when a player creates a new game
     * and is the first player in the game session.
     *
     * @param currentPlayer - The player to initialize the session for
     * @param game - The game to initialize the session for
     *
     * @returns - The new game session
     */
    public initSession = async (
        currentPlayer : Player,
        game          : Game,
    ) => {
        this.log.silly('GameSessionService::initSession', {
            currentPlayer, game,
        });

        return this.gameSessionRepo.save({
            exited_player_id_list : [],
            selected_card_id_list : [],
            limbo_player_id_list  : [],
            current_score_log_id  : null,
            dealer_card_id_list   : [],
            game_card_id_list     : [],
            used_black_cards      : [],
            used_white_cards      : [],
            player_id_list        : [currentPlayer.id],
            lobby_host_id         : currentPlayer.id,
            round_number          : 0,
            player_list           : [currentPlayer.id],
            black_cards           : [],
            white_cards           : [],
            hand_number           : 0,
            created_by            : currentPlayer.id,
            game_stage            : GameStage.Lobby,
            dealer_id             : currentPlayer.id,
            game_id               : game.id,
        });
    }

    /**
     * Setup a new game session
     *
     * @param session - The session to setup
     * @param currentPlayer - The player to setup the session for
     * @param currentScoreLog - The current score log for the game
     * @param dealerCardIdList - The list of dealer cards to use
     * @param usedWhiteCardIds - The list of used white cards
     * @param allBlackCardIds - The list of all black cards
     * @param allWhiteCardIds - The list of all white cards
     *
     * @returns - The session update object, not the session itself
     */
    public setupNewGameSession = async (
        session: GameSession,
        currentPlayer: Player,
        currentScoreLog: ScoreLog,
        dealerCardIdList: string[],
        usedWhiteCardIds: string[],
        allBlackCardIds: string[],
        allWhiteCardIds: string[],
    ) =>
        this.gameSessionRepo.update(session.id!, {
            selected_card_id_list : [],
            current_score_log_id  : currentScoreLog.id,
            dealer_card_id_list   : dealerCardIdList,
            used_black_cards      : dealerCardIdList,
            used_white_cards      : usedWhiteCardIds,
            black_cards           : allBlackCardIds,
            white_cards           : allWhiteCardIds,
            game_stage            : GameStage.DealerPickBlackCard,
            dealer_id             : currentPlayer.id!,
        });


    /**
     * Promote a random player to the host of the game session
     * This is used when the host leaves the game and a new host needs to be selected
     * from the list of players in the game session, and also stages them to be the first
     * dealer whent the game starts.
     *
     * @param session - The session to promote a player to host
     * @param runtimeContext - Additional context for debugging
     *
     * @returns - The updated session with the new host / dealer
     */
    public promoteRandomPlayerToHost = async (
        session: GameSession,
        runtimeContext: string,
    ) : P<GameSession> => {
        const debugBundle = { session, runtimeContext };

        this.log.silly('GameSessionService::promotePlayerToHost', { debugBundle });

        if(session.game_stage !== GameStage.Lobby) {
            this.log.error('Cannot promote player to host in a non-lobby game', { debugBundle });

            throw new WsException('Cannot promote player to host in a non-lobby game');
        }

        // if there are no other players, kill the game. There could be people
        // in limbo waiting forever if all the players leave the lobby
        if(session.player_id_list.length === 0) {
            this.log.error('Cannot promote player to host in a game with no players', { debugBundle });

            throw new WsException(`Cannot promote player to host in a game with no players, session(${session.id})`);
        }

        // pick a random player from the player_id_list and promote them to the host,
        // which also sets them to be the first dealer when the game starts.
        const newLobbyHost = session.player_id_list[0];

        this.log.silly('Player promoted to host', { newLobbyHost, debugBundle });

        await this.gameSessionRepo.update(session.id, {
            ...session,
            lobby_host_id : newLobbyHost,
            dealer_id     : newLobbyHost,
        });

        return this.gameSessionRepo.findOneByOrFail({
            id : session.id,
        });
    }

    /**
     * Promote a random player to the dealer of the game session if
     * they are in active game mode. The first dealer is the lobby host
     * because they are more likely to know what they're doing when
     * the game starts, helping other people learn as well. Randomly making
     * someone else dealer would be anxiety inducing even if its simple
     *
     * @param session - The session to promote a player to dealer
     *
     * @returns - The updated session with the new dealer
     */
    public promoteRandomPlayerToDealer = async (
        session : GameSession,
        runtimeContext : string,
    ) : P<GameSession> => {
        const debugBundle = { session, runtimeContext };

        this.log.silly('GameSessionService::promoteRandomPlayerToDealer', { debugBundle });

        if(session.game_stage === GameStage.Lobby) {
            const errorMessage = 'Promote a dealer by making them host while in lobby mode.';

            this.log.error(errorMessage, { debugBundle });

            throw new WsException(errorMessage);
        }

        if(session.player_id_list.length === 0) {
            const errorMessage = `Cannot promote player to dealer in a game with no players, session(${session.id})`;

            this.log.error(errorMessage, { debugBundle });

            throw new WsException(errorMessage);
        }

        const newDealer = session.player_id_list[0];

        this.log.silly('Player promoted to dealer', { newDealer, debugBundle });

        await this.gameSessionRepo.update(session.id, {
            ...session,
            dealer_id : newDealer,
        });

        return this.gameSessionRepo.findOneByOrFail({
            id : session.id,
        });
    }

    /**
     * Moves the game to the next stage, where dealer picks from
     * the list of player selected cards
     *
     * @param session - The session to update
     *
     * @returns - The updated session
     */
    public gotoDealerPickWinnerStage = async (session: GameSession) =>
        this.gameSessionRepo.save({
            ...session,
            game_stage : GameStage.DealerPickWinner,
        });

    public skipToNextHand = async (session: GameSession, runtimeContext : string) => {
        const debugBundle = { session, runtimeContext };

        this.log.silly('GameSessionService::handleSkipToNextHand', { debugBundle });

        console.log('handleSkipToNextHand', debugBundle);

        debugger;

        return;
    }

    /**
     * Player selects a white card for the game, appending it to the list of
     * player selected cards for this hand
     *
     * @param session - The session to update
     * @param selectedCardId - The ID of the card the player selected
     *
     * @returns - The updated session with the new card appended to the list
     */
    public playerSelectsWhiteCard = async (session: GameSession, selectedCardId: string) =>
        this.gameSessionRepo.save({
            ...session,
            selected_card_id_list : [...session.selected_card_id_list, selectedCardId],
        });

    /**
     * Moves the game into the results stage, and marks the hand as complete
     * by incrementing hand count
     *
     * @param session - The session to update
     *
     * @returns - The updated session with updated hand number
     */
    public showHandResults = async (session: GameSession) =>
        this.gameSessionRepo.save({
            ...session,
            game_stage  : GameStage.GameResults,
            hand_number : session.hand_number + 1,
        });

    /**
     * Dealer picks a black card for the game, and moves the game to the next stage
     *
     * @param session - The session to update
     * @param dealerPickedCardId - The ID of the card the dealer picked
     *
     * @returns - The updated session
     */
    public dealerPickedBlackCard = async (session: GameSession, dealerPickedCardId: string) =>
        this.gameSessionRepo.save({
            ...session,
            dealer_card_id : dealerPickedCardId!,
            game_stage     : GameStage.PlayerPickWhiteCard,
        });

    /**
     * Find the active game session for a player, ensuring that
     * the associated session with this game is still active
     *
     * @param player - The player to find the active game session for
     *
     * @returns - The active game session for the player
     */
    public findActiveGameSession = async (game: Game) =>
        this.gameSessionRepo.findOneOrFail({
            where : {
                completed_at : IsNull(),
                id           : game.current_session_id!,
            },
        });

    public relateToScoreLog = async (session: GameSession, scoreLog: ScoreLog) =>
        this.gameSessionRepo.save({
            ...session,
            current_score_log_id : scoreLog.id,
        });


    /**
     * Removes a player from a game session, updating one or more fields
     * to handle the manner in which the player exited the game.
     *
     * @param player         - The player to remove from the session
     * @param session        - The session to remove the player from
     * @param exitReason     - The reason the player is being removed
     * @param runtimeContext - Additional context for debugging
     *
     * @returns - The updated session
     */
    public removePlayerFromSession = async (
        player: Player,
        session: GameSession,
        exitReason: GameExitReason,
        runtimeContext: string = '',
    ) => {
        const debugBundle = { player, session, exitReason, runtimeContext };

        // Log the initial state of the removal process for debugging purposes
        this.log.silly('GameSessionService::removePlayer', { debugBundle });

        // Determine additional updates based on the exit reason
        switch (exitReason) {
            case GameExitReason.Disconnected:
                debugger;

                // Append the player's ID to the disconnected player list
                await this.gameSessionRepo.update(session.id, {
                    ...session,
                    exited_player_id_list : () => `array_append(exited_player_id_list, '${player.id}')`,
                    limbo_player_id_list  : () => `array_remove(limbo_player_id_list,  '${player.id}')`,
                    player_id_list        : () => `array_remove(player_id_list,        '${player.id}')` });
                    break;

            case GameExitReason.Booted:
                debugger;

                // Append the player's ID to the disconnected player list
                await this.gameSessionRepo.update(session.id, {
                    ...session,
                    exited_player_id_list : () => `array_remove(exited_player_id_list, '${player.id}')`,
                    limbo_player_id_list  : () => `array_remove(limbo_player_id_list,  '${player.id}')`,
                    player_id_list        : () => `array_remove(player_id_list,        '${player.id}')`,
                });
                break;

            case GameExitReason.JoiningOther:
            case GameExitReason.LeftByChoice:
                this.log.info('Player exiting game, exit reason', { exitReason });

                await this.gameSessionRepo.update(session.id, {
                    ...session,
                    exited_player_id_list : () => `array_append(exited_player_id_list, '${player.id}')`,
                    limbo_player_id_list  : () => `array_remove(limbo_player_id_list,  '${player.id}')`,
                    player_id_list        : () => `array_remove(player_id_list,        '${player.id}')`,
            });
            break;
        }

        // return the updated session
        return this.gameSessionRepo.findOneByOrFail({
            id : session.id,
        });
    }


    /**
     * Award the winner of the game and mark the game as complete
     *
     * @param session - The session to award the winner of
     * @param winnerId - The ID of the player who won the game
     *
     * @returns - The updated session
     */
    public awardWinnerAndComplete = async (
        session: GameSession,
        winnerId: string | null,
        gameEndMessage : string) =>
        this.gameSessionRepo.save({
            ...session,
            champion_player_id : winnerId,
            game_end_message   : gameEndMessage,
            completed_at       : new Date(),
            game_stage         : GameStage.GameComplete,
        });

    /**
     * Move the game to the next hand, dealing new cards to the dealer and players
     * and updating the game stage.
     *
     * @param newDealerCards - The new cards to be dealt to the dealer
     * @param newWhiteCards  - The new white cards to be dealt to the players
     * @param newGameStage   - The new stage of the game
     * @param newDealerId    - The ID of the new dealer
     * @param newScoreLog    - The new score log for the game
     * @param session        - The session to update
     *
     * @returns - The updated session
     */
    public nextHand = async (
        newDealerCards: string[], newWhiteCards: string[], newGameStage: GameStage,
        newDealerId: string, newScoreLog: ScoreLog, session: GameSession,
    ) =>
        this.gameSessionRepo.update(session.id, {
            selected_card_id_list : [],
            current_score_log_id  : newScoreLog.id,
            dealer_card_id_list   : newDealerCards,
            used_black_cards      : [...session.used_black_cards, ...newDealerCards],
            used_white_cards      : [...session.used_white_cards, ...newWhiteCards],
            hand_number           : session.hand_number + 1,
            game_stage            : newGameStage,
            dealer_id             : newDealerId,
        });

    /**
     * Find the active game session for a player
     *
     * @param player - The player to find the active game session for
     *
     * @returns - The active game session for the player
    */
    public findActivePlayerGameSession = async (
        player: Player,
    ): P<GameSession | null> =>
        this.gameSessionRepo.findOne({
            where : {
                completed_at   : IsNull(),
                player_id_list : ArrayContains([player.id]),
            },
        })
}

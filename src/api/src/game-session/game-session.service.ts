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


export enum JoinGameScenario {
    ReconnectingDisconnectedPlayer = 'ReconnectingDisconnectedPlayer',
    JoiningPlayerIsAlreadyInLimbo  = 'JoiningPlayerIsAlreadyInLimbo',
    PlayerIsAlreadyInGame          = 'PlayerIsAlreadyInGame',
    PlayerJoinsMidGame             = 'PlayerJoinsMidGame',
    PlayerFastRefresh              = 'PlayerFastRefresh',
    NewGameAndPlayer               = 'NewGameAndPlayer',
};


@Injectable()
export class GameSessionService {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @InjectRepository(GameSession)
        private readonly gameSessionRepo: Repository<GameSession>,
    ) { }

    // leaveOpenSession(currentPlayer)
    public leaveOpenSession = async (currentPlayer: Player) => {
        const prefix = 'GameSessionService::leaveOpenSession';

        this.log.silly(prefix, { currentPlayer });

        const session = await this.findActivePlayerGameSession(currentPlayer);

        if (!session) {
            this.log.info(`${prefix}::NoSessionFound`, currentPlayer);

            return;
        }

        this.log.info(`${prefix} Found a session, removing player`, currentPlayer, session);

        return this.removePlayer(currentPlayer, session);
    };


    private getJoinGameScenario = (
        player: Player, session: GameSession,
    ) : JoinGameScenario => {
        const {
            disconnected_player_id_list,
            limbo_player_id_list,
            player_id_list,
        } = session;

        // NEW GAME AND PLAYER
        // Joined Pregame Lobby
        // IF: The game is in lobby mode still before the game has started.
        // ACTION: Add player to the player_id_list and emit the
        // updated session to all players in the session.
        if (session.game_stage === GameStage.Lobby &&
            !player_id_list.includes(player.id))
            return JoinGameScenario.NewGameAndPlayer;

        // PLAYER FAST REFRESH
        // Fast Reconnect / Page Refresh
        // IF: The player is reconnecting and the game doesn't realize they were even
        // gone. Means disconnect didnt' go through as expected (hence the possible
        // reason for the disconnect) they they rapidly joined back before any timers
        // moved them into disconnected state. Means they exist in the player_id_list,
        // but not in the disconnected_player_id_list or limbo_player_id_list
        // ACTION: Check the game session and ensure their player_id is only in
        // the player_id_list and not in the disconnected_player_id_list or limbo_player_id_list
        // and the game should continue as if nothing happened from other players
        // perspective. The current user may have just refreshed their browser or lost
        // connection, server crash whatever the case may be. Should broadcase to all
        // players (though ther may be an efficiency gain by skipping other players,
        // nothing should have changed for them)
        if (player_id_list.includes(player.id) &&
            !disconnected_player_id_list.includes(player.id) &&
            !limbo_player_id_list.includes(player.id))
            return JoinGameScenario.PlayerFastRefresh;


        // Joining Player is Already in Limbo
        // IF: If they are listed in the limbo_player_id_list and
        // are NOT in disconnected_player_id_list, then they're
        // joinged as a new player while the game is already in progress and
        // were put into limbo previously. This could happen if they
        // were in limbo and refreshed the page or rejoined the game multiple
        // times as the same user
        // ACTION: do nothing. Could happen if they are in limbo and refresh,
        // they should just stay there. Emit update to players
        if (limbo_player_id_list.includes(player.id) &&
            !disconnected_player_id_list.includes(player.id))
            return JoinGameScenario.JoiningPlayerIsAlreadyInLimbo;


        // Reconnecting Disconnected Player
        // IF: They are listed in the disconnected_player_id_list, then
        // they were disconnected and the server properly registerd the
        // disconnnect, and the players were notified with updated state
        // reflecting the dicsconnected player.
        // ACTION: Remove them from the disconnected_player_id_list.
        // The player_id_list has all players, so just removing it from
        // disconnected reconnectes them to the session. Joining players
        // who were previously disconnected properly should be
        // added back automatically. They skip limbo since they're
        // already known to be in the game and are dealt in.
        if (disconnected_player_id_list.includes(player.id))
            return JoinGameScenario.ReconnectingDisconnectedPlayer;


        // PLAYER IS ALREADY IN GAME
        // IF: The player joining is already in this game and
        // their player_id is NOT in disconnected_player_id_list
        // AND NOT in limbo_player_id_list. So they're just an active
        // player already but a joing game request was sent.
        // ACTION: Do nothing, they are already in the game so noop.
        // Emit update to players, but possibly not necessary.
        if (player_id_list.includes(player.id) &&
            !disconnected_player_id_list.includes(player.id) &&
            !limbo_player_id_list.includes(player.id))
            return JoinGameScenario.PlayerIsAlreadyInGame;


        // PLAYER JOINS MIDGAME
        // IF: The new player is unknown to the current game session and
        // the game has already started (no longer in lobby mode). They are
        // joining late and have not been dealt in yet.
        // ACTION: Add their player_id to the limbo_player_id_list
        // and emit the updated session to all players in the session.
        // Once the current hand ends, they will be dealt in. Later
        // on, it will have "Admit / Ignore / Ban" etc options to
        // allow players to optionally let players in limbo into the game [idea].
        if (!player_id_list.includes(player.id) &&
            session.game_stage !== GameStage.Lobby)
            return JoinGameScenario.PlayerJoinsMidGame;


        // Additional Cases
        // 1. Player Attempts to Join a Full Game
        // 2. Player Attempts to Join a Banned Session

        // Default case if none of the above match
        return JoinGameScenario.JoiningPlayerIsAlreadyInLimbo;
    }

    public getActiveGameSessionList = async (
        player : Player, session : GameSession,
    ) => {
        const stageAndId = {
            game_stage : Not(GameStage.GameComplete),
            id         : Not(session.id),
        };

        const playerIdArray = ArrayContains([player.id]);

        return this.gameSessionRepo.find({
            where : [{
                disconnected_player_id_list : playerIdArray,
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
     *
     * @returns void
     */
    public setPlayerGameSession = async (
        player: Player, session: GameSession,
    ) : P<unknown> => {
        this.log.silly('GameSessionService::addPlayerToSession', { player, session });

        // Find all active game sessions this player is tied to and
        // remove them, except for the session we're adding outselves to.
        const activeGameSessionList = await this.getActiveGameSessionList(player, session);

        // Removes player from any active session aside
        // from the one we're joining
        await Promise.all(
            activeGameSessionList.map(async activeSession =>
                this.removePlayer(player, activeSession)));

        const joinGameState = this.getJoinGameScenario(player, session);

        switch(joinGameState) {
            case JoinGameScenario.ReconnectingDisconnectedPlayer:
                return this.joinGameViaReconnectingDisconnectedPlayer(player, session);

            case JoinGameScenario.JoiningPlayerIsAlreadyInLimbo:
                return this.joinGameViaJoiningPlayerIsAlreadyInLimbo(player, session);

            case JoinGameScenario.PlayerIsAlreadyInGame:
                return this.joinGameViaPlayerIsAlreadyInGame(player, session);

            case JoinGameScenario.PlayerJoinsMidGame:
                return this.joinGameViaPlayerJoinsMidGame(player, session);

            case JoinGameScenario.PlayerFastRefresh:
                return this.joinGameViaPlayerFastRefresh(player, session);

            case JoinGameScenario.NewGameAndPlayer:
                return this.joinGameViaNewGameAndPlayer(player, session);

            default: throw new WsException(`Invalid Join Game Scenario ${joinGameState}`);
        }
    }

    // // The game is in the lobby and hasnt started, auto admit them
        // return this.gameSessionRepo
        //     .createQueryBuilder()
        //     .update(GameSession)
        //     .set({
        //         player_id_list : () => `array_append(player_id_list, '${player.id}')`,
        //     })
        //     .where("id = :id", { id : session.id })
        //     .andWhere("game_stage != :game_stage", {
        //         game_stage : GameStage.GameComplete,
        //     })
        //     .execute();

    // Reconnecting Disconnected Player
    // IF: They are listed in the disconnected_player_id_list, then
    // they were disconnected and the server properly registerd the
    // disconnnect, and the players were notified with updated state
    // reflecting the dicsconnected player.
    // ACTION: Remove them from the disconnected_player_id_list.
    // The player_id_list has all players, so just removing it from
    // disconnected reconnectes them to the session. Joining players
    // who were previously disconnected properly should be
    // added back automatically. They skip limbo since they're
    // already known to be in the game and are dealt in.
    private joinGameViaReconnectingDisconnectedPlayer =  async (
        player: Player, session: GameSession,
    ) : P<unknown> => {
        const debugBundle = { player, session };
        const debugText = `playerId(${player.id}) sessionId(${session.id})`;

        this.log.silly('GameSessionService::DisconnectedPlayer', { debugBundle });

        if(!session.disconnected_player_id_list.includes(player.id)) {
            this.log.error(`DisconnectedPlayer::player - Player is not in the disconnected list`, { debugBundle });
            throw new WsException(`DisconnectedPlayer::player ${debugBundle}`);
        }

        if(session.limbo_player_id_list.includes(player.id)) {
            this.log.error(`DisconnectedPlayer::limbo - Player is in limbo`, { debugBundle });
            throw new WsException(`DisconnectedPlayer::limbo ${debugText}`);
        }

        if(session.player_id_list.includes(player.id)) {
            this.log.error(`DisconnectedPlayer::player - Player is in disconnect, but not in player list.`, { debugBundle });
            throw new WsException(`DisconnectedPlayer::player ${debugText}`);
        }

        this.log.info('Reconnecting Disconnected Player', { debugBundle });

        // just remove from the disconnected player array,
        // they are already in the player_list
        return this.gameSessionRepo.update(session.id, {
            ...session,
            disconnected_player_id_list : () =>
                `array_remove(disconnected_player_id_list, '${player.id}')`,
        });
    };

    // Joining Player is Already in Limbo
    // IF: If they are listed in the limbo_player_id_list and
    // are NOT in disconnected_player_id_list, then they're
    // joinged as a new player while the game is already in progress and
    // were put into limbo previously. This could happen if they
    // were in limbo and refreshed the page or rejoined the game multiple
    // times as the same user
    // ACTION: do nothing. Could happen if they are in limbo and refresh,
    // they should just stay there. Emit update to players
    private joinGameViaJoiningPlayerIsAlreadyInLimbo =  async (
        player: Player, session: GameSession,
    ) : P<unknown> => {
        const debugBundle = { player, session };

        this.log.silly('GameSessionService::joinGameViaJoiningPlayerIsAlreadyInLimbo', { debugBundle });

        return this.log.debug('Player is already in limbo, no action required',  { debugBundle });
    };

    // PLAYER IS ALREADY IN GAME
    // IF: The player joining is already in this game and
    // their player_id is NOT in disconnected_player_id_list
    // AND NOT in limbo_player_id_list. So they're just an active
    // player already but a joing game request was sent.
    // ACTION: Do nothing, they are already in the game so noop.
    // Emit update to players, but possibly not necessary.
    private joinGameViaPlayerIsAlreadyInGame =  async (
        player: Player, session: GameSession,
    ) : P<unknown> => {
        const debugBundle = { player, session };

        this.log.silly('GameSessionService::joinGameViaPlayerIsAlreadyInGame', { debugBundle });

        if(session.disconnected_player_id_list.includes(player.id)) {
            this.log.error(`playerIsAlreadyInGame::disconnected - Incorrect Flow`, { debugBundle });
            throw new WsException(`playerIsAlreadyInGame::disconnected`);
        }

        if(session.limbo_player_id_list.includes(player.id)) {
            this.log.error(`playerIsAlreadyInGame::limbo - Incorrect Flow`, { debugBundle });
            throw new WsException(`playerIsAlreadyInGame::limbo`);
        }

        if(!session.player_id_list.includes(player.id)) {
            this.log.error(`playerIsAlreadyInGame::player - Player isn't in this game`, { debugBundle });
            throw new WsException(`playerIsAlreadyInGame::player`);
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
    private joinGameViaPlayerJoinsMidGame =  async (
        player: Player, session: GameSession,
    ) : P<unknown> => {

        const debugBundle = { player, session };
        const debugText = `playerId(${player.id}) sessionId(${session.id})`;

        this.log.silly('GameSessionService::joinGameViaPlayerJoinsMidGame', { debugBundle });

        const { limbo_player_id_list, player_id_list } = session;

        // players in limbo
        if(player_id_list.includes(player.id)) {
            this.log.error(`playerJoinsMidGame::player - Player is already in the game`, { debugBundle });
            throw new WsException(`playerJoinsMidGame::player (${debugText})`);
        }

        if(limbo_player_id_list.includes(player.id)) {
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
    // but not in the disconnected_player_id_list or limbo_player_id_list
    // ACTION: Check the game session and ensure their player_id is only in
    // the player_id_list and not in the disconnected_player_id_list or limbo_player_id_list
    // and the game should continue as if nothing happened from other players
    // perspective. The current user may have just refreshed their browser or lost
    // connection, server crash whatever the case may be. Should broadcase to all
    // players (though ther may be an efficiency gain by skipping other players,
    // nothing should have changed for them)
    private joinGameViaPlayerFastRefresh =  async (
        player: Player, session: GameSession,
    ) : P<unknown> => {
        const debugBundle = { player, session };

        this.log.silly('GameSessionService::joinGameViaPlayerFastRefresh', { debugBundle });

        const {
            disconnected_player_id_list, limbo_player_id_list, player_id_list,
        } = session;

        const debugText = `playerId(${player.id}) sessionId(${session.id})`;

        if(disconnected_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::disconnected - Incorrect Flow`, { debugBundle });
            throw new WsException(`playerFastRefresh::disconnected (${debugText})`);
        }
        if(limbo_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::limbo - Already In Limbo`, { debugBundle });
            throw new WsException(`playerFastRefresh::limbo (${debugText})`);
        }

        if(!player_id_list.includes(player.id)) {
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
    private joinGameViaNewGameAndPlayer =  async (
        player: Player, session: GameSession,
    ) : P<unknown> => {

        const debugBundle = { player, session };

        this.log.silly('GameSessionService::joinGameViaNewGameAndPlayer', { debugBundle });

        // ensure there's only one copy of the playerid by
        // attempting to remove one of the same name before
        // appending it to the list

        const {
            disconnected_player_id_list,
            limbo_player_id_list,
            player_id_list,
        } = session;

        const debugText = `playerId(${player.id}) sessionId(${session.id})`;

        if(disconnected_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::disconnected -  Client previously disconnected, incorrect flow.`, { debugBundle });
            throw new WsException(`playerFastRefresh::disconnected (${debugText})`);
        }

        if(limbo_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::limbo - Already In Limbo.`, { debugBundle });
            throw new WsException(`playerFastRefresh::limbo (${debugText})`);
        }

        // player is not already in the game
        if(player_id_list.includes(player.id)) {
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


    public initSession = async (
        currentPlayer: Player, game: Game,
    ) => {
        this.log.silly('GameSessionService::initSession', {
            currentPlayer, game,
        });

        return this.gameSessionRepo.save({
            disconnected_player_id_list : [],
            selected_card_id_list       : [],
            limbo_player_id_list        : [],
            current_score_log_id        : null,
            dealer_card_id_list         : [],
            game_card_id_list           : [],
            used_black_cards            : [],
            used_white_cards            : [],
            player_id_list              : [currentPlayer.id],
            lobby_host_id               : currentPlayer.id,
            round_number                : 0,
            player_list                 : [currentPlayer.id],
            black_cards                 : [],
            white_cards                 : [],
            hand_number                 : 0,
            created_by                  : currentPlayer.id,
            game_stage                  : GameStage.Lobby,
            dealer_id                   : currentPlayer.id,
            game_id                     : game.id,
        });
    }


    public setupNewGameSession = async (
        session          : GameSession,
        currentPlayer    : Player,
        currentScoreLog  : ScoreLog,
        dealerCardIdList : string[],
        usedWhiteCardIds : string[],
        allBlackCardIds  : string[],
        allWhiteCardIds  : string[],
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

    public gotoDealerPickWinnerStage = async (session: GameSession) =>
        this.gameSessionRepo.save({
            ...session,
            game_stage : GameStage.DealerPickWinner,
        });

    public playerSelectsWhiteCard = async (session: GameSession, selectedCardId: string) =>
        this.gameSessionRepo.save({
            ...session,
            selected_card_id_list : [...session.selected_card_id_list, selectedCardId],
        })
    public showHandResults = async (session: GameSession) =>
        this.gameSessionRepo.save({
            ...session,
            game_stage  : GameStage.GameResults,
            hand_number : session.hand_number + 1,
        });

    public dealerPickedBlackCard = async (session: GameSession, dealerPickedCardId: string) =>
        this.gameSessionRepo.save({
            ...session,
            dealer_card_id : dealerPickedCardId!,
            game_stage     : GameStage.PlayerPickWhiteCard,
        });

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

    public removePlayer = async (player: Player, session: GameSession) =>
        this.gameSessionRepo.update(session.id, {
            ...session,
            player_id_list : () => `array_remove('${player.id}', player_id_list)`,
        });

    public awardWinnerAndComplete = async (session: GameSession, winnerId: string) =>
        this.gameSessionRepo.update(session.id, {
            champion_player_id : winnerId,
            completed_at       : new Date(),
            game_stage         : GameStage.GameComplete,
        });

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

    public findActivePlayerGameSession = async (
        player: Player,
    ): P<GameSession | null> => {

        return this.gameSessionRepo.findOne({
            where : {
                completed_at   : IsNull(),
                player_id_list : ArrayContains([player.id]),
            },
        });
    }
}

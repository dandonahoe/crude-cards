import { ArrayContains, IsNull, Not, Repository } from 'typeorm';
import { ScoreLog } from '../score-log/score-log.entity';
import { GameStage } from '../constant/game-stage.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GameSession } from './game-session.entity';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { P } from '../../../type/framework/data/P';
import { Player } from '../player/player.entity';
import { Game } from '../game/game.entity';
import { Logger } from 'winston';

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

    public setPlayerGameSession = async (currentPlayer: Player, session: GameSession) => {
        this.log.silly('GameSessionService::addPlayerToSession', { currentPlayer, session });

        // Find all active game sessions this player
        // is tied to and remove them, except for the session we're
        // adding outselves to.

        const activeGameSessionList = await this.gameSessionRepo.find({
            where : [{
                player_id_list : ArrayContains([currentPlayer.id]),
                game_stage     : Not(GameStage.GameComplete),
                id             : Not(session.id),
            }, {
                disconnected_player_id_list : ArrayContains([currentPlayer.id]),
                game_stage                  : Not(GameStage.GameComplete),
                id                          : Not(session.id),
            }, {
                limbo_player_id_list : ArrayContains([currentPlayer.id]),
                game_stage           : Not(GameStage.GameComplete),
                id                   : Not(session.id),
            }],
        });

        // Removes player from any active session aside
        // from the one we're joining
        await Promise.all(
            activeGameSessionList.map(
                async activeSession =>
                    this.removePlayer(currentPlayer, activeSession)));

        // now update the session we're joining.
        // A few states can occur here:

        // choose cases which eliminate the most states first

        // NEW GAME AND PLAYER
        // Joined Pregame Lobby
        // IF: The game is in lobby mode still before the game has started.
        // ACTION: Add player to the player_id_list and emit the
        // updated session to all players in the session.

        // PLAYER FAST REFRESH
        // Fast Reconnect / Page Refresh
        // IF: The player is reconnecting and the game doesn't realize
        // they were even gone. Means disconnect didnt' go through
        // as expected (hence the possible reason for the disconnect)
        // they they rapidly joined back before any timers moved them
        // into disconnected state. Means they exist in the player_id_list,
        // but not in the disconnected_player_id_list or limbo_player_id_list
        // ACTION: Check the game session and ensure their player_id is only in
        // the player_id_list and not in the disconnected_player_id_list or limbo_player_id_list
        // and the game should continue as if nothing happened from other players perspective.
        // The current user may have just refreshed their browser or lost
        // connection, server crash whatever the case may be. Should
        // broadcase to all players (though ther may be an efficiency gain
        // by skipping other players, nothing should have changed for them)

        // Joining Player is Already in Limbo
        // IF: If they are listed in the limbo_player_id_list and
        // are NOT in disconnected_player_id_list, then they're
        // joinged as a new player while the game is already in progress and
        // were put into limbo previously. This could happen if they
        // were in limbo and refreshed the page or rejoined the game multiple
        // times as the same user
        // ACTION: do nothing. Could happen if they are in limbo and refresh,
        // they should just stay there. Emit update to players

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

        // PLAYER IS ALREADY IN GAME
        // IF: The player joining is already in this game and
        // their player_id is NOT in disconnected_player_id_list
        // AND NOT in limbo_player_id_list. So they're just an active
        // player already but a joing game request was sent.
        // ACTION: Do nothing, they are already in the game so noop.
        // Emit update to players, but possibly not necessary.

        // PLAYER JOINS MIDGAME
        // IF: The new player is unknown to the current game session and
        // the game has already started (no longer in lobby mode). They are
        // joining late and have not been dealt in yet.
        // ACTION: Add their player_id to the limbo_player_id_list
        // and emit the updated session to all players in the session.
        // Once the current hand ends, they will be dealt in. Later
        // on, it will have "Admit / Ignore / Ban" etc options to
        // allow players to optionally let players in limbo into the game [idea].

        // The game is in the lobby and hasnt started, auto admit them
        return this.gameSessionRepo
            .createQueryBuilder()
            .update(GameSession)
            .set({
                player_id_list : () => `array_append(player_id_list, '${currentPlayer.id}')`,
            })
            .where("id = :id", { id : session.id })
            .andWhere("game_stage != :game_stage", {
                game_stage : GameStage.GameComplete,
            })
            .execute();
    }

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

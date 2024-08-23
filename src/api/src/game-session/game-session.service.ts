import { ArrayContains, IsNull, Repository } from 'typeorm';
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
        this.log.silly('GameSessionService::leaveOpenSession', { currentPlayer });

        const session = await this.findActivePlayerGameSession(currentPlayer);

        this.log.silly('GameSessionService::leaveOpenSession', { currentPlayer, session });

        if (!session) {
            this.log.info('GameSessionService::leaveOpenSession::NoSessionFound', currentPlayer);

            return;
        }

        this.log.info('GameSessionService::leaveOpenSession Found a session, removing player', currentPlayer, session);

        return this.removePlayer(currentPlayer, session);
    };

    public addPlayerToSession = async (currentPlayer: Player, session: GameSession) => {
        this.log.silly('GameSessionService::addPlayerToSession', {
            currentPlayer, session,
        });

        return this.gameSessionRepo
            .createQueryBuilder()
            .update(GameSession)
            .set({
                player_id_list : () => `array_append(player_id_list, '${currentPlayer.id}')`,
            })
            .where("id = :id", { id : session.id })
            .execute();
    }


    public initSession = async (
        currentPlayer: Player, game: Game,
    ) => {
        this.log.silly('GameSessionService::initSession', {
            currentPlayer, game,
        });

        return this.gameSessionRepo.save({
            selected_card_id_list : [],
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
            game_id               : game.id,
            created_by            : currentPlayer.id,
            game_stage            : GameStage.Lobby,
            dealer_id             : currentPlayer.id,
        });
    }


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
        this.gameSessionRepo.update(player.id, {
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

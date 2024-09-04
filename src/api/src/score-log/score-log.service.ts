import { GameSession } from '../game-session/game-session.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { ScoreLog } from './score-log.entity';
import { Repository } from 'typeorm';
import { Logger } from 'winston';


@Injectable()
export class ScoreLogService {

    /**
     * Constructor for the ScoreLogService class.
     *
     * @param log - The logger instance.
     * @param scoreLogRepo - The repository for ScoreLog entities.
     */
    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @InjectRepository(ScoreLog)
        private readonly scoreLogRepo: Repository<ScoreLog>,
    ) {
        this.log.silly('ScoreLogService instantiated');
    }

    /**
     * Counts the number of game rounds in a session.
     *
     * @param session - The game session.
     * @returns The count of game rounds.
     */
    public countGameRounds = async (session: GameSession): Promise<number> =>
        this.scoreLogRepo.count({
            where : {
                game_session_id : session.id,
            }}) ?? 0;

    /**
     * Creates a new score log for a session.
     *
     * @param session - The game session.
     * @returns The created score log.
     */
    public createNewScoreLog = async (session: GameSession): Promise<ScoreLog> =>
        this.scoreLogRepo.save({
            player_selected_cards : [],
            game_session_id       : session.id!,
        });

    /**
     * Finds a score log by session.
     *
     * @param session - The game session.
     * @returns The found score log or undefined if not found.
     */
    public findScoreLogBySession = async (
        session: GameSession,
    ) =>
        this.scoreLogRepo.findOne({
            where : {
                game_session_id : session.id,
            },
        });

    /**
     * Updates the score log with new data.
     *
     * @param scoreLog     - The existing score log to update.
     * @param session      - The game session.
     * @param winnerPlayer - The winning player.
     * @param winnerCardId - The ID of the winning card.
     * @param dealer       - The dealer player.
     * @returns A promise indicating the completion of the update.
     */
    public updateScore = async (
        scoreLog     : ScoreLog,
        session      : GameSession,
        winnerPlayer : Player,
        winnerCardId : string,
        dealer       : Player,
    ) =>
        this.scoreLogRepo.update(scoreLog.id, {
            player_selected_cards : session.selected_card_id_list,
            winner_player_id      : winnerPlayer.id,
            judge_player_id       : dealer.id!,
            winner_card_id        : winnerCardId!,
        });

    /**
     * Relates a new score log to a session.
     *
     * @param session - The game session.
     * @returns The related score log.
     */
    public relateToSession = async (session: GameSession): Promise<ScoreLog> =>
        this.scoreLogRepo.save({
            player_selected_cards : [],
            game_session_id       : session.id,
        });
}

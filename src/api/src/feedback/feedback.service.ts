import { SubmitFeedbackDTO } from '../game/dtos/submit-feedback.dto';
import { GameSession } from '../game-session/game-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { P } from '../../../type/framework/data/P';
import { Player } from '../player/player.entity';
import { Feedback } from './feedback.entity';
import { Injectable } from '@nestjs/common';
import { Game } from '../game/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {

    public constructor(
        @InjectRepository(Feedback)
        private readonly feedbackRepo: Repository<Feedback>,
    ) { }

    public submitFeedback = async (
        submitFeedback: SubmitFeedbackDTO,
        currentPlayer: Player,
        session: GameSession | null,
        game: Game | null,
    ): P<Feedback> => this.feedbackRepo.save({
        created_by : currentPlayer ? currentPlayer.id : null,
        session_id : session ? session.id : null,
        game_code  : game ? game.game_code : null,
        player_id  : currentPlayer.id!,
        message    : submitFeedback.message!,
        email      : submitFeedback.email!,
        name       : submitFeedback.name!,
    });
}

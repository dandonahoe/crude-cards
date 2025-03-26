import { GameWebSocketExceptionFilter } from '../filters/GameWebSocketException.filter';
import { GameSessionModule } from '../game-session/game-session.module';
import { GameExceptionFilter } from '../filters/GameException.filter';
import { ScoreLogModule } from '../score-log/score-log.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { PlayerModule } from '../player/player.module';
import { UtilService } from '../util/util.service';
import { SockService } from '../sock/sock.service';
import { UtilModule } from '../util/util.module';
import { SockModule } from '../sock/sock.module';
import { CardModule } from '../card/card.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '../log/Log.module';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import {  Module } from '@nestjs/common';
import { Game } from './game.entity';
import { Logger } from 'winston';
import { OpenAIModule } from '../openai/openai.module';
import { OpenAIService } from '../openai/openai.service';


@Module({
    exports : [
        GameService,
    ],

    providers : [
        GameWebSocketExceptionFilter,
        GameExceptionFilter,
        OpenAIService,
        UtilService,
        SockService,
        GameService,
        GameGateway,
        Logger,
    ],

    imports : [
        GameSessionModule,
        FeedbackModule,
        ScoreLogModule,
        PlayerModule,
        OpenAIModule,
        CardModule,
        UtilModule,
        SockModule,
        LogModule,

        TypeOrmModule.forFeature([
            Game,
        ]),
    ],
})
export class GameModule { }

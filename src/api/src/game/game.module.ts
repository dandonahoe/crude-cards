import { GameSessionModule } from '../game-session/game-session.module';
import { ScoreLogModule } from '../score-log/score-log.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { PlayerModule } from '../player/player.module';
import { UtilService } from '../util/util.service';
import { UtilModule } from '../util/util.module';
import { CardModule } from '../card/card.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '../log/Log.module';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import {  Module } from '@nestjs/common';
import { Game } from './game.entity';
import { Logger } from 'winston';


@Module({
    exports : [
        GameService,
    ],

    providers : [
        Logger,
        UtilService,
        GameService,
        GameGateway,
    ],

    imports : [
        LogModule,
        GameSessionModule,
        FeedbackModule,
        ScoreLogModule,
        PlayerModule,
        CardModule,
        UtilModule,

        TypeOrmModule.forFeature([
            Game,
        ]),
    ],
})
export class GameModule { }

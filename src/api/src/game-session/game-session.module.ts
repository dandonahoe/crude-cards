import { GameSessionService } from './game-session.service';
import { GameSession } from './game-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '../log/Log.module';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';


@Module({
    providers : [
        Logger,
        GameSessionService,
    ],
    imports : [
        LogModule,
        TypeOrmModule.forFeature([
            GameSession,
        ])],
    exports : [
        GameSessionService,
    ],
})

export class GameSessionModule { }

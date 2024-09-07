import { GameSession } from './game-session/game-session.entity';
import { ScoreLog } from './score-log/score-log.entity';
import { Feedback } from './feedback/feedback.entity';
import { Player } from './player/player.entity';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { Game } from './game/game.entity';
import { Card } from './card/card.entity';


export const createDataSourceOptions = (
    configService: ConfigService,
): DataSourceOptions => ({
    type        : 'postgres',
    host        : configService.get<string>('BACKEND_DATABASE_HOST'),
    port        : configService.get<number>('BACKEND_DATABASE_PORT'),
    username    : configService.get<string>('BACKEND_DATABASE_USER'),
    password    : configService.get<string>('BACKEND_DATABASE_PASS'),
    database    : configService.get<string>('BACKEND_DATABASE_NAME'),
    synchronize : true,
    logging     : false,
    entities    : [
        GameSession,
        Feedback,
        ScoreLog,
        Player,
        Game,
        Card,
    ],
    migrations  : ['migrations/*.ts'],
    subscribers : [],
});

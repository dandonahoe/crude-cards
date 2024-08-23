import { ScoreLogService } from './score-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreLog } from './score-log.entity';
import { LogModule } from '../log/Log.module';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';


@Module({
    imports : [
        LogModule,
        TypeOrmModule.forFeature([
            ScoreLog,
        ]),
    ],
    providers : [
        Logger,
        ScoreLogService,
    ],
    exports : [
        ScoreLogService,
    ],
})
export class ScoreLogModule { }

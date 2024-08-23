import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';
import { LogModule } from '../log/Log.module';

@Module({
    exports   : [FeedbackService],
    providers : [
        Logger,
        FeedbackService,
    ],
    imports : [
        LogModule,
        TypeOrmModule.forFeature([Feedback]),
    ],
})
export class FeedbackModule { }

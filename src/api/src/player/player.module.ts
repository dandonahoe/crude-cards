import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppDataSource } from '../data-source';
import { Player } from './player.entity';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';
import { LogModule } from '../log/Log.module';

/**
 * Module to handle player-related functionalities.
 */
@Module({
    providers : [
        Logger,
        PlayerService,
    ],
    imports : [
        LogModule,

        // Configure TypeORM module with the application's data source options
        // TypeOrmModule.forRoot(AppDataSource.options),

        // Register the Player entity for dependency injection
        TypeOrmModule.forFeature([Player]),
    ],
    exports : [PlayerService], // Export PlayerService for use in other modules
})
export class PlayerModule { }

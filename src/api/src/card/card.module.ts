import { TypeOrmModule } from '@nestjs/typeorm';
import { CardService } from './card.service';
import { Module } from '@nestjs/common';
import { Card } from './card.entity';
import { Logger } from 'winston';
import { LogModule } from '../log/Log.module';

@Module({
    // Declare the services that will be instantiated by the NestJS IoC container
    providers : [Logger, CardService],

    // Export the services to make them available to other modules
    exports : [CardService],

    // Import the TypeOrmModule and register the Card entity
    imports : [
        LogModule,
        TypeOrmModule.forFeature([Card]),
    ],
})
export class CardModule {}

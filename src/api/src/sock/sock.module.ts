import { SockService } from './sock.service';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';


@Module({
    // Declare providers (services and other dependencies) that will be used within this module.
    providers : [
        Logger, // Inject the global Winston Logger instance.
        SockService, // Custom utility service containing shared utility functions.
    ],
    // Export the SockService so it can be used in other modules.
    exports : [SockService],
})
export class SockModule {}

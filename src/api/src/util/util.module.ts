import { UtilService } from './util.service';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';

@Module({
    // Declare providers (services and other dependencies) that will be used within this module.
    providers : [
        Logger, // Inject the global Winston Logger instance.
        UtilService, // Custom utility service containing shared utility functions.
    ],
    // Export the UtilService so it can be used in other modules.
    exports : [UtilService],
})
export class UtilModule {}

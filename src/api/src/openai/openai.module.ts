import { OpenAIService } from './openai.service';
import { Module } from '@nestjs/common';

/**
 * The OpenaiModule is responsible for providing the OpenAIService.
 */
@Module({
    providers : [
        OpenAIService,
    ],
})
export class OpenAIModule {}

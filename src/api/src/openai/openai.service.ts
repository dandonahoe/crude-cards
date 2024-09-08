import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { P } from '../../../type/framework/data/P';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';


@Injectable()
export class OpenAIService {

    private openAI: OpenAI;


    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) {
        log.silly('Initalizing OpenAI Service');

        this.openAI = new OpenAI({
            apiKey : process.env.OPENAI_API_KEY,
        });
    }

    public completeText = async (prompt: string): P<string> => {

        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            model    : 'gpt-4o',
            messages : [{
                role    : 'user',
                content : prompt,
            }],
            max_tokens  : 150,
            temperature : 0.7,
        };

        const chatCompletion = await this.openAI.chat.completions.create(params);

        const result = chatCompletion.choices[0].message.content!.trim();

        return result;
    }
}

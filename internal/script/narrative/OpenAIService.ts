import { Config } from './config';
import OpenAI from 'openai';

export class OpenAIService {
    private static openAI: OpenAI;

    public static initialize(): void {
        const apiKey = Config.ensure('OPENAI_API_KEY');
        OpenAIService.openAI = new OpenAI({ apiKey });
    }

    public static async completeText(prompt: string): Promise<string> {
        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            model       : 'gpt-4o',
            messages    : [{ role : 'user', content : prompt }],
            max_tokens  : 70,
            temperature : 1,
        };

        const chatCompletion = await OpenAIService.openAI.chat.completions.create(params);

        return chatCompletion.choices[0].message.content!.trim();
    }
}

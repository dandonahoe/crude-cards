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
            model    : 'gpt-4o',
            messages : [{
                role    : 'system',
                content : `You help expand on and describe a
D&D like world. You will listen to the users
feedback and expand on it in a loop like this.`,
            }, {
                role    : 'user',
                content : prompt,
            }],
            temperature : 1,
        };

        const chatCompletion = await OpenAIService.openAI.chat.completions.create(params);

        return chatCompletion.choices[0].message.content!.trim();
    }
}

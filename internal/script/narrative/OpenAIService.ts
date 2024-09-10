import OpenAI from 'openai';
import { Config } from './config';  // Assuming your config file handles environment variables

export class OpenAIService {
    private static openAI: OpenAI;

    public constructor() {

    }
    public static initialize() {

        const apiKey = Config.ensure('OPENAI_API_KEY');
        OpenAIService.openAI = new OpenAI({
            apiKey, // Replace with your OpenAI API key
        });
    }

    public static completeText = async (prompt: string): Promise<string> => {
        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            model    : 'gpt-4o',
            messages : [{
                role    : 'user',
                content : prompt,
            }],
            max_tokens  : 70,
            temperature : 1,
        };

        const chatCompletion = await OpenAIService.openAI.chat.completions.create(params);

        const result = chatCompletion.choices[0].message.content!.trim();

        return result;
    }
}

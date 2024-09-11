import { Config } from './config';
import OpenAI from 'openai';

type Message = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};

export class OpenAIService {
    private static openAI: OpenAI;
    private static conversationLog: Message[] = [];

    // Initialize the OpenAI client
    public static initialize(): void {
        const apiKey = Config.ensure('OPENAI_API_KEY');
        OpenAIService.openAI = new OpenAI({ apiKey });
    }

    // Reset the conversation log
    public static resetConversation(): void {
        OpenAIService.conversationLog = [];
        OpenAIService.conversationLog.push({
            role    : 'system',
            content : `You help expand on and
describe a D&D-like world.
You will listen to the user's feedback and obey. Make frequent use of
Person, Place, Thing, Event, Relationships since those are
entity types which I will later ask you to parse from your response in a systematic way.
You are not describing whole worlds, just specifics of it to iteratively build
out a engaging interesting world.`,
        });
    }


    // Add a message to the conversation log
    private static addToConversation(role: 'user' | 'assistant' | 'system', content: string): void {
        OpenAIService.conversationLog.push({ role, content });
    }

    // Get the current conversation log as a simple array of messages
    public static getConversationLog(): Message[] {
        return OpenAIService.conversationLog;
    }

    // Send a prompt to OpenAI and get a response
    public static async completeText(prompt: string): Promise<string> {
        // Add the user's input to the conversation log
        OpenAIService.addToConversation('user', prompt);

        const messages = OpenAIService.getConversationLog();

        // debugger;

        // Prepare the request parameters
        const params = {
            model       : 'gpt-4',
            messages,
            max_tokens  : 100,
            temperature : 1,
        };

        // Send the prompt to OpenAI and get a response
        const chatCompletion = await OpenAIService.openAI.chat.completions.create(params as any);
        const aiResponse = chatCompletion.choices[0].message.content!.trim();

        // Add the AI response to the conversation log
        OpenAIService.addToConversation('assistant', aiResponse);

        return aiResponse;
    }
}

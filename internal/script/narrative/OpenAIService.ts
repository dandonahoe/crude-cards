import { Config } from './config';
import OpenAI from 'openai';

// Message type definition for the conversation log
export type Message = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};

// Entity and Relationship definitions from OpenAI's JSON response
export interface AIResponseEntity {
    type: 'Person' | 'Place' | 'Thing' | 'Event';
    name: string;
    description: string;
}

export interface AIResponseRelation {
    from: string;
    to: string;
    relationship: string;
}

export interface AIResponse {
    entities: AIResponseEntity[];
    relations: AIResponseRelation[];
}

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
            content : `You help expand on and describe a D&D-like world.
                        You will listen to the user's feedback and obey.`,
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

    // Send a prompt to OpenAI and get a regular response as part of the conversation flow
    public static async completeText(prompt: string): Promise<string> {
        // Add the user's input to the conversation log
        OpenAIService.addToConversation('user', prompt);

        const messages = OpenAIService.getConversationLog();

        // Prepare the request parameters
        const params = {
            model       : 'gpt-4',
            messages,
            max_tokens  : 100,
            temperature : 0.7,
        };

        // Send the prompt to OpenAI and get a response
        const chatCompletion = await OpenAIService.openAI.chat.completions.create(params as any);
        const aiResponse = chatCompletion.choices[0].message.content!.trim();

        // Add the AI response to the conversation log
        OpenAIService.addToConversation('assistant', aiResponse);

        return aiResponse;
    }

    // Separate method for working with JSON (entity and relationship extraction)
    public static async extractEntitiesFromJson(prompt: string): Promise<AIResponse> {
        // Prepare the specific prompt for extracting JSON-formatted entities and relationships
        const jsonPrompt = `
            Based on the following description, extract all entities (Person, Place, Thing, Event) and relationships
            in a structured JSON format:

            "${prompt}"

            Respond only with JSON in the following format:
            {
                "entities": [
                    {"type": "Person", "name": "John", "description": "A warrior."},
                    {"type": "Place", "name": "Dark Forest", "description": "A gloomy forest."}
                ],
                "relations": [
                    {"from": "John", "to": "Dark Forest", "relationship": "Explores"}
                ]
            }
        `;

        // Prepare the request parameters
        const params = {
            model       : 'gpt-4',
            messages    : [{ role : 'system', content : jsonPrompt }],
            max_tokens  : 500,
            temperature : 1,
        };

        // Send the JSON prompt to OpenAI and get a response
        const chatCompletion = await OpenAIService.openAI.chat.completions.create(params as any);
        const aiResponseText = chatCompletion.choices[0].message.content!.trim();

        // Parse the AI response as structured JSON
        try {
            const parsedResponse: AIResponse = JSON.parse(aiResponseText);

            return parsedResponse;
        } catch (error) {
            console.error('Error parsing AI response:', error);
            throw new Error('Failed to parse AI response as JSON');
        }
    }
}

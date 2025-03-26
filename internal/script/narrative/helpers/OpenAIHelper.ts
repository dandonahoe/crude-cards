import { OpenAIService } from '../OpenAIService';
import { AIResponse } from '../OpenAIService';

// Generate the detailed description using OpenAI
export async function generateDescription(objectDescription: string): Promise<string> {
    return await OpenAIService.completeText(objectDescription);
}

// Extract entities and relationships from the description
export async function extractEntitiesAndRelations(description: string): Promise<AIResponse> {
    return await OpenAIService.extractEntitiesFromJson(description);
}

import { AIResponseEntity, AIResponseRelation } from '../OpenAIService';

// Display entities and relationships
export function displayEntitiesAndRelationships(entities: AIResponseEntity[], relations: AIResponseRelation[]): void {
    console.log("\nEntities:");
    console.table(entities, ['type', 'name', 'description']);

    console.log("\nRelationships:");
    console.table(relations, ['from', 'relationship', 'to']);
}

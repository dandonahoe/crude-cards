import { BaseActionHandler, ActionParams } from "./BaseActionHandler";
import { OpenAIService } from "../OpenAIService";
import { Neo4jService } from "../neo4jService";
import inquirer from 'inquirer';

export class ContinueAdventureAction extends BaseActionHandler {
    public id = 'ContinueAdventure';
    public name = 'Continue Describing Adventure';
    public description = 'Continue describing the universe of the adventure by generating detailed descriptions for objects.';

    public constructor() {
        super(); // Provide the alphanumeric short name
    }

    public override paramsSchema = {};

    // Helper function to extract entities and relationships from the description
    private extractEntitiesAndRelationships(description: string) {
        const entities: any[] = [];
        const relationships: any[] = [];

        // Simple regex or parsing logic to extract entities and inferred relationships
        const entityRegex = /(a|an|the)\s([A-Za-z\s]+)\b/gi;
        let match;

        // Example logic: Extract entities based on pattern (e.g., "a horse", "an old man")
        while ((match = entityRegex.exec(description)) !== null)
            entities.push({
                name        : match[2].trim(),
                description : match[0].trim(),
            });


        // Example: Add inferred relationships based on entities found
        // You can expand this logic based on the complexity of your description.
        if (entities.length > 1)
            relationships.push({
                from             : entities[0].name,
                to               : entities[1].name,
                relationshipType : 'RELATED_TO',
            });


        return { entities, relationships };
    }

    // Store the extracted entities and relationships in Neo4j
    private async storeInNeo4j(neo4jService: Neo4jService, entities: any[], relationships: any[]) {

        debugger;
        for (const entity of entities)
            await neo4jService.createThingNode(entity.name, 'Entity', entity.description);

        for (const relationship of relationships) {
            debugger;

            await neo4jService.createRelationship(
                relationship.from,          // Name of the first node
                relationship.fromLabel,     // Label of the first node
                relationship.to,            // Name of the second node
                relationship.toLabel,       // Label of the second node
                relationship.relationshipType, // Type of relationship
            );
        }
    }

    // The main execute function
    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {

        console.log('Continuing the adventure...', params);

        // Step 1: Prompt the user to describe an object or entity
        const { objectDescription } = await inquirer.prompt([
            {
                type    : 'input',
                name    : 'objectDescription',
                message : 'Describe an object, entity, or concept (e.g., a bucket, a horse):',
            },
        ]);

        // Step 2: Use OpenAI to generate a detailed description based on the input
        const detailedDescription = await OpenAIService.completeText(`Describe the following: ${objectDescription}`);

        // Step 3: Output the more complete description
        console.log(`Original Input: ${objectDescription}`);
        console.log(`Detailed Description: ${detailedDescription}`);

        // Step 4: Extract entities and relationships from the description
        const { entities, relationships } = this.extractEntitiesAndRelationships(detailedDescription);

        console.log('Extracted Entities:', entities);
        console.log('Inferred Relationships:', relationships);

        // Step 5: Store entities and relationships in Neo4j
        await this.storeInNeo4j(neo4jService, entities, relationships);

        console.log('Entities and relationships have been stored in Neo4j.');
    }
}

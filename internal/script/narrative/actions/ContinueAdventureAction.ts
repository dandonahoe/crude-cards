import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { OpenAIService } from '../OpenAIService';
import { Neo4jService } from '../neo4jService';

import inquirer from 'inquirer';

export class ContinueAdventureAction extends BaseActionHandler {

    public id = 'ContinueAdventure';
    public name = 'Continue Describing Adventure';
    public description = 'Generate and continue describing the adventure.';

    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {

        console.log('Continuing the adventure...', params);

        const { objectDescription } = await inquirer.prompt([{
            type    : 'input',
            name    : 'objectDescription',
            message : 'Describe an object, entity, or concept (e.g., a bucket, a horse):',
        }]);

        const detailedDescription = await OpenAIService.completeText(`Describe the following: ${objectDescription}`);
        console.log(`Original Input: ${objectDescription}`);
        console.log(`Detailed Description: ${detailedDescription}`);

        const { entities, relationships } = this.extractEntitiesAndRelationships(detailedDescription);
        await this.storeEntitiesAndRelationships(neo4jService, entities, relationships);
    }

    private extractEntitiesAndRelationships(description: string) {
        const entities = []; const relationships = [];
        const entityRegex = /(a|an|the)\s([A-Za-z\s]+)\b/gi;
        let match;
        while ((match = entityRegex.exec(description)) !== null)
            entities.push({ name : match[2].trim(), description : match[0].trim() });

        if (entities.length > 1)
            relationships.push({ from : entities[0].name, to : entities[1].name, relationshipType : 'RELATED_TO' });

        return { entities, relationships };
    }

    private async storeEntitiesAndRelationships(neo4jService: Neo4jService, entities: any[], relationships: any[]) {
        for (const entity of entities)
            await neo4jService.createNode('Entity', entity);

        for (const relationship of relationships)
            await neo4jService.createRelationship(relationship.from, 'Entity', relationship.to, 'Entity', relationship.relationshipType);
    }
}

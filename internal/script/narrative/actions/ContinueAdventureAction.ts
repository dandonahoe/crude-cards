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
    }
}

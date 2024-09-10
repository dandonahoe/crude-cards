import { BaseActionHandler, ActionParams } from "./BaseActionHandler";
import { Neo4jService } from "../neo4jService";
import inquirer from 'inquirer';
import { OpenAIService } from "../OpenAIService";


export class ContinueAdventureAction extends BaseActionHandler {
    public id = 'ContinueAdventure';
    public name = 'Continue Describing Adventure';
    public description = 'Continue describing the universe of the adventure by generating detailed descriptions for objects.';

    public constructor() {
        super(); // Provide the alphanumeric short name
    }

    public override paramsSchema = {};

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
    }
}

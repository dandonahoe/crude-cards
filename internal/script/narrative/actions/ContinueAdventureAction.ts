import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { OpenAIService } from '../OpenAIService';
import { Neo4jService } from '../neo4jService';
import inquirer from 'inquirer';


export class ContinueAdventureAction extends BaseActionHandler {
    public id = 'ContinueAdventure';
    public name = 'Continue Describing Adventure';
    public description = 'Generate, refine, and display adventure entities and relationships.';

    // Helper function to ask for refinement, accept, or reject
    private async askForRefinement(): Promise<string> {
        const { refinementOption } = await inquirer.prompt([{
            type    : 'list',
            name    : 'refinementOption',
            message : 'Do you want to refine, accept, or reject the description?',
            choices : [
                { name : 'Refine', value : 'refine' },
                { name : 'Accept', value : 'accept' },
                { name : 'Reject', value : 'reject' },
            ],
        }]);

        return refinementOption;
    }

    // Helper function to get user feedback
    private async getUserFeedback(): Promise<string> {
        const { userFeedback } = await inquirer.prompt([{
            type    : 'input',
            name    : 'userFeedback',
            message : 'Provide feedback or refinement for the description:',
        }]);

        return userFeedback;
    }

    // Main execute function to handle the loop of refinement and display of entities
    public async execute(neo4jService: Neo4jService, _params: ActionParams = {}): Promise<void> {
        // Reset the conversation for each session
        OpenAIService.resetConversation();

        let continueLoop = true;
        let objectDescription = '';

        // Step 1: Initial input to start the adventure
        const { initialDescription } = await inquirer.prompt([{
            type    : 'input',
            name    : 'initialDescription',
            message : 'Describe an object, entity, or concept (e.g., a bucket, a horse):',
        }]);

        objectDescription = initialDescription;

        // Loop for refining, viewing entities, and repeating
        while (continueLoop) {
            // Step 2: Generate the detailed description from OpenAI
            console.log('Generating detailed description...');
            const detailedDescription = await OpenAIService.completeText(objectDescription);
            console.log(`Detailed Description: ${detailedDescription}`);

            // Step 3: Extract entities and relationships as JSON
            const extractedData = await OpenAIService.extractEntitiesFromJson(detailedDescription);

            extractedData.entities.forEach(entity => {
                console.log(`Entity: ${entity.type} - ${entity.name} - ${entity.description}`);
            });

            // Step 4: Display the extracted entities and relationships
            extractedData.relations.forEach(relation => {
                console.log(`Relation: ${relation.relationship} - ${relation.from} - ${relation.to}`);
            });

            // Step 5: Ask the user for refinement or acceptance
            const refinementOption = await this.askForRefinement();

            if (refinementOption === 'refine') {
                const userFeedback = await this.getUserFeedback();
                objectDescription = `User Feedback: ${userFeedback}`;
            } else if (refinementOption === 'accept') {
                console.log('Description accepted.');
                continueLoop = false;
            } else if (refinementOption === 'reject') {
                console.log('Description rejected. Restarting the description process...');
                const { newDescription } = await inquirer.prompt([{
                    type    : 'input',
                    name    : 'newDescription',
                    message : 'Please enter a new description:',
                }]);
                objectDescription = newDescription;
                OpenAIService.resetConversation(); // Reset conversation if rejected
            }
        }
    }
}

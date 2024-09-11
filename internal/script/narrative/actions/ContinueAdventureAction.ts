import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { OpenAIService } from '../OpenAIService';
import { Neo4jService } from '../neo4jService';
import inquirer from 'inquirer';

export class ContinueAdventureAction extends BaseActionHandler {
    public id = 'ContinueAdventure';
    public name = 'Continue Describing Adventure';
    public description = 'Generate and continue describing the adventure.';

    // Helper function for refinement
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

    // Helper function to get user feedback or modifications
    private async getUserFeedback(): Promise<string> {
        const { userFeedback } = await inquirer.prompt([{
            type    : 'input',
            name    : 'userFeedback',
            message : 'Provide additional commentary or refinement for the description:',
        }]);

        return userFeedback;
    }

    // Main execute function with loop for refinement
    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {
        console.log('Continuing the adventure...', params);

        // Reset the conversation for a new session
        OpenAIService.resetConversation();

        let continueLoop = true;
        let objectDescription = '';
        let detailedDescription = '';

        // Step 1: Initial input to start the adventure
        const { initialDescription } = await inquirer.prompt([{
            type    : 'input',
            name    : 'initialDescription',
            message : 'Describe an object, entity, or concept (e.g., a bucket, a horse):',
        }]);


        objectDescription = initialDescription;

        // Loop to refine, accept, or reject the description
        while (continueLoop) {

            // Step 2: AI generates detailed description
            console.log('Generating detailed description...', objectDescription);

            detailedDescription = await OpenAIService.completeText(objectDescription);

            console.log(`Detailed Description: ${detailedDescription}`);

            // Step 3: Ask for refinement advice
            const refinementOption = await this.askForRefinement();

            if (refinementOption === 'refine') {
                // Step 4: User provides feedback or refines
                const userFeedback = await this.getUserFeedback();

                // Combine the original description and the user feedback for refinement
                objectDescription = `User Feedback to consider in response: ${userFeedback}`;

            } else if (refinementOption === 'accept') {
                console.log('Description accepted.');

                continueLoop = false; // Exit loop, accept the result

            } else if (refinementOption === 'reject') {
                console.log('Description rejected. Restarting the description process...');

                // Restarting the description process
                const { newDescription } = await inquirer.prompt([{
                    type    : 'input',
                    name    : 'newDescription',
                    message : 'Please enter a new description:',
                }]);

                objectDescription = newDescription;
                OpenAIService.resetConversation();  // Reset the conversation if rejected
            }
        }

        console.log('Finalized Description:', detailedDescription);
        console.log('Conversation Log:', OpenAIService.getConversationLog().join('\n'));
    }
}

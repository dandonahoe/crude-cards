import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { Neo4jService } from '../neo4jService';
import { promptInitialDescription, askForRefinement, getUserFeedback } from '../helpers/UserPromptHelper';
import { generateDescription, extractEntitiesAndRelations } from '../helpers/OpenAIHelper';
import { displayEntitiesAndRelationships } from '../helpers/EntityDisplayHelper';

export class ContinueAdventureAction extends BaseActionHandler {
    public id = 'ContinueAdventure';
    public name = 'Continue Describing Adventure';
    public description = 'Generate, refine, and display adventure entities and relationships.';

    // Main execute function to handle the loop of refinement and display of entities
    public async execute(neo4jService: Neo4jService, _params: ActionParams = {}): Promise<void> {
        let continueLoop = true;
        let objectDescription = await promptInitialDescription(); // Get initial input from the user

        while (continueLoop) {
            // Generate the detailed description from OpenAI
            console.log('Generating detailed description...');
            const detailedDescription = await generateDescription(objectDescription);
            console.log(`Detailed Description: ${detailedDescription}`);

            // Extract entities and relationships as JSON
            const { entities, relations } = await extractEntitiesAndRelations(detailedDescription);

            // Display the extracted entities and relationships
            displayEntitiesAndRelationships(entities, relations);

            // Ask the user for refinement or acceptance
            const refinementOption = await askForRefinement();

            if (refinementOption === 'refine') {
                const userFeedback = await getUserFeedback();
                objectDescription = `User Feedback: ${userFeedback}`;
            } else if (refinementOption === 'accept') {
                console.log('Description accepted.');
                continueLoop = false;
            } else if (refinementOption === 'reject') {
                console.log('Description rejected. Restarting the description process...');
                objectDescription = await promptInitialDescription(); // Reset description
            }
        }
    }
}

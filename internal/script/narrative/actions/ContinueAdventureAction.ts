import { promptInitialDescription, askForRefinement, getUserFeedback } from '../helpers/UserPromptHelper';
import { generateDescription, extractEntitiesAndRelations } from '../helpers/OpenAIHelper';
import { displayEntitiesAndRelationships } from '../helpers/EntityDisplayHelper';
import { AIResponseEntity, AIResponseRelation } from '../OpenAIService';
import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { RefinementOption } from '../types/Enums';
import { Neo4jService } from '../neo4jService';

export class ContinueAdventureAction extends BaseActionHandler {
    public id          = 'ContinueAdventure';
    public name        = 'Continue Describing Adventure';
    public description = 'Generate, refine, and display adventure entities and relationships.';

    // Main execute function to handle the loop of refinement and display of entities
    public async execute(neo4jService: Neo4jService, _params: ActionParams = {}): Promise<void> {
        let continueLoop = true;
        let objectDescription: string = await promptInitialDescription(); // Get initial input from the user

        while (continueLoop) {
            // Generate the detailed description from OpenAI
            console.log('Generating detailed description...');
            const detailedDescription: string = await generateDescription(objectDescription);
            console.log(`Detailed Description: ${detailedDescription}`);

            // Extract entities and relationships as JSON
            const { entities, relations }: {
                entities: AIResponseEntity[], relations: AIResponseRelation[]
            } = await extractEntitiesAndRelations(detailedDescription);

            // Display the extracted entities and relationships
            displayEntitiesAndRelationships(entities, relations);

            // Ask the user for refinement or acceptance
            const refinementOption = (await askForRefinement()) as RefinementOption;

            switch (refinementOption) {
                case RefinementOption.Refine: {
                    const userFeedback : string = await getUserFeedback();

                    objectDescription = `User Feedback: ${userFeedback}`;
                } break;
                case RefinementOption.Accept: {
                    console.log('Description accepted.');

                    continueLoop = false;
                } break;

                case RefinementOption.Reject: {
                    console.log('Description rejected. Restarting the description process...');

                    objectDescription = await promptInitialDescription(); // Reset description
                } break;

                default:
                    throw new Error('Invalid refinement option');
            }
        }
    }
}

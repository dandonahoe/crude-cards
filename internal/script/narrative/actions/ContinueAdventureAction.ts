import { promptInitialDescription, askForRefinement, getUserFeedback } from '../helpers/UserPromptHelper';
import { generateDescription, extractEntitiesAndRelations } from '../helpers/OpenAIHelper';
import { displayEntitiesAndRelationships } from '../helpers/EntityDisplayHelper';
import { AIResponseRelation, AIResponseEntity } from '../OpenAIService';
import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { RefinementOption } from '../types/Enums';
import { Neo4jService } from '../neo4jService';


export class ContinueAdventureAction extends BaseActionHandler {
    public description = 'Generate, refine, and display adventure entities and relationships.';
    public name        = 'Continue Describing Adventure';
    public id          = 'ContinueAdventure';

    // Main execute function to handle the loop of refinement and display of entities
    public execute = async (
        neo4jService: Neo4jService, _params: ActionParams = {},
    ): Promise<void> =>{

        let continueLoop = true;
        let objectDescription = await promptInitialDescription(); // Get initial input from the user

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
            const refinementOption = await askForRefinement();

            if (refinementOption === RefinementOption.Refine) {
                const userFeedback: string = await getUserFeedback();

                objectDescription = `User Feedback: ${userFeedback}`;
            } else if (refinementOption === RefinementOption.Accept) {
                console.log('Description accepted.');

                // Store the entities and relationships in Neo4j
                await this.storeEntitiesAndRelations(neo4jService, entities, relations);

                continueLoop = false;
            } else if (refinementOption === RefinementOption.Reject) {
                console.log('Description rejected. Restarting the description process...');

                objectDescription = await promptInitialDescription(); // Reset description
            }
        }
    }

    // Store the accepted entities and relationships in Neo4j
    private storeEntitiesAndRelations = async (
        neo4jService : Neo4jService,
        entities     : AIResponseEntity[],
        relations    : AIResponseRelation[],
    ): Promise<void> => {

        // Store entities in the database
        for (const entity of entities)
            switch (entity.type) {
                // eslint-disable-next-line max-len
                case 'Person': return await neo4jService.createPersonNode(entity.name, 'neutral', new Date().toISOString(), 'human', 'undefined');
                case 'Place' : return await neo4jService.createPlaceNode( entity.name, 'unknown', { latitude : 0, longitude : 0 });
                case 'Thing' : return await neo4jService.createThingNode( entity.name, 'object', entity.description);
                case 'Event' : return await neo4jService.createEventNode( entity.name, 'unknown event', new Date().toISOString());

                default: console.warn(`Unknown entity type: ${entity.type}`);
            }

        // Store relationships in the database
        // Create a generic relationship between two nodes
        for (const relation of relations)
            await neo4jService.createRelationship(relation.from, 'Generic', relation.to, 'Generic', relation.relationship);

        console.log('Entities and relationships stored in Neo4j successfully.');
    }
}

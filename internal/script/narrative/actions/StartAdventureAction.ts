import { ActionParams, BaseActionHandler } from "./BaseActionHandler";
import { Neo4jService } from "../neo4jService";

export class StartAdventureAction extends BaseActionHandler {
    public id = 'startAdventure';
    public name = 'Start Adventure';
    public description = 'Start a new adventure session';

    public override isRequired = true; // Exit action is required and can't be deleted

    // Define any required parameters for starting an adventure (e.g., character name, difficulty level)
    public override paramsSchema = {
        adventureName : { required : true },
        difficulty    : { required : false, default : 'Medium' },
    };

    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {
        const adventureName = params.adventureName || 'Unknown Adventure';
        const difficulty = params.difficulty || 'Medium';

        // Logic for creating a new adventure session in Neo4j or elsewhere
        console.log(`Starting new adventure: ${adventureName} at difficulty: ${difficulty}`);

        // Here you can add logic to store the adventure session in the database
        // For example, creating a new adventure node in Neo4j
        const createdAt = new Date().toISOString();

        const result = await neo4jService.createPersonNode(adventureName, difficulty, createdAt, 0, 0, {});
        console.log('Adventure session created:', result);
    }
}

import { ActionParams, BaseActionHandler } from "./BaseActionHandler";
import { Neo4jService } from "../neo4jService";

export class ContinueAdventureAction extends BaseActionHandler {
    public id = 'ContinueAdventure';
    public name = 'Continue Describing Adventure';
    public description = 'Continue describing the universe of the adventure';

    // Define any required parameters for starting an adventure (e.g., character name, difficulty level)
    public override paramsSchema = {
        // TBD
        // adventureName : { required : true },
        // difficulty    : { required : false, default : 'Medium' },
    };

    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {

        console.log('params:', params);
    }
}

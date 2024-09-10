import { ActionParams, BaseActionHandler } from "./BaseActionHandler";
import { GeoUtils } from "./geoUtils";
import { Neo4jService } from "./neo4jService";

export class ContinueGameAction extends BaseActionHandler {
    public id = 'continueGame';
    public name = 'Continue Game';
    public description = 'Create a new person node and continue the game';

    public async execute(neo4jService: Neo4jService, _params: ActionParams = {}): Promise<void> {

        const name = `Person_${new Date().toISOString()}`;
        const alignment = 'Neutral';
        const createdAt = new Date().toISOString();
        const { latitude, longitude } = GeoUtils.getRandomCoordinates();
        const location = await GeoUtils.getLocationDetails(latitude, longitude);

        const nodeProperties = await neo4jService.createPersonNode(
            name, alignment, createdAt, latitude, longitude, location,
        );

        console.log('Person node created:', nodeProperties);
    }
}


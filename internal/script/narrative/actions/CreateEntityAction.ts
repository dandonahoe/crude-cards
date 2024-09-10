import { ActionParams, BaseActionHandler } from './BaseActionHandler';
import { GeoUtils } from '../geoUtils';
import { Neo4jService } from '../neo4jService';

export class CreateEntityAction extends BaseActionHandler {
    public id = 'createEntity';
    public name = 'Create Entity';
    public description = 'Create a new entity node and continue the game';

    // Define required parameters
    public override paramsSchema = {
        name      : { required : true },
        alignment : { required : false, default : 'Neutral' },
    };

    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {
        const name = params.name || `Person_${new Date().toISOString()}`;
        const alignment = params.alignment || 'Neutral';
        const createdAt = new Date().toISOString();
        const { latitude, longitude } = GeoUtils.getRandomCoordinates();
        const location = await GeoUtils.getLocationDetails(latitude, longitude);

        const nodeProperties = await neo4jService.createPersonNode(
            name, alignment, createdAt, latitude, longitude, location,
        );

        console.log('Person node created:', nodeProperties);
    }
}

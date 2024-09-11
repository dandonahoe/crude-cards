
import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { Neo4jService } from '../neo4jService';

export class BrowseDatabase extends BaseActionHandler {
    public id = 'browsedatabase';
    public name = 'BrowseDatabase';
    public description = 'A dynamically generated action.';

    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {
        console.log('Action Name:', 'BrowseDatabase');
    }
}

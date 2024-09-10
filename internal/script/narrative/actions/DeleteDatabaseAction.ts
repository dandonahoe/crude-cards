import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { Neo4jService } from '../neo4jService';

export class DeleteDatabaseAction extends BaseActionHandler {

    public id = 'deleteDatabase';
    public name = 'Delete Database';
    public description = 'Delete all nodes and relationships in the Neo4j database';

    public override isRequired = true; // Prevent this action from being deleted

    public async execute(neo4jService: Neo4jService, params?: ActionParams): Promise<void> {
        await neo4jService.deleteDatabase();
        console.log('Database deleted successfully.', params);
    }
}

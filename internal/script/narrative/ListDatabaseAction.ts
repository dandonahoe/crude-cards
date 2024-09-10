import { BaseActionHandler, ActionParams } from "./BaseActionHandler";
import { Neo4jService } from "./neo4jService";

// List Database Action
export class ListDatabaseAction extends BaseActionHandler {
    public id = 'listDatabase';
    public name = 'List Database';
    public description = 'List all person nodes in the database';

    public async execute(neo4jService: Neo4jService, params?: ActionParams): Promise<void> {
        const persons = await neo4jService.queryAllPersons();
        if (persons.length > 0) {
            console.log('Current Persons in the Database:', params);
            persons.forEach(person => {
                console.log(`- ${person.name} (${person.alignment})`);
            });
        } else {
            console.log('No persons found in the database.', params);
        }
    }
}

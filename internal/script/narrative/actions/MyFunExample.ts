
import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { Neo4jService } from '../neo4jService';

export class MyFunExample extends BaseActionHandler {

    public id = 'myfunexample';
    public name = 'My Fun Example!';
    public description = 'A dynamically generated action.';

    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {
        console.log('Action Name:', params);
    }
}

import { loadNewAction } from '../dynamicActionLoader'; // Helper for loading the action
import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { sanitizeActionName, writeNewActionFile } from '../dynamicActionManager';
import { Neo4jService } from '../neo4jService';

export class GenerateAction extends BaseActionHandler {
    public id = 'generateAction';
    public name = 'Generate New Action';
    public description = 'Generates a new action file based on user input.';

    // Define the required parameter schema
    public override paramsSchema = {
        actionName : { required : true },
    };

    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {
        const { actionName } = params;

        if (!actionName) {
            console.error('Action name is required.');

            return;
        }

        // Write the new action file using the sanitized name
        writeNewActionFile(actionName);

        // Load and register the new action
        const sanitizedActionName = sanitizeActionName(actionName);
        await loadNewAction(sanitizedActionName);

        console.log(`Action "${sanitizedActionName}" has been generated and registered.`);
    }
}

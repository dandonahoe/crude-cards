import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { sanitizeActionName } from '../dynamicActionManager';
import { ActionRegistry } from '../actionRegistry';
import * as path from 'path';
import * as fs from 'fs';

export class DeleteActionAction extends BaseActionHandler {

    public id = 'deleteAction';
    public name = 'Delete Action';
    public description = 'Deletes an existing action file and unregisters it from the registry.';

    // Define the required parameter schema
    public override paramsSchema = {
        actionName : { required : true },
    };

    public async execute(_: any, params: ActionParams = {}): Promise<void> {
        const { actionName } = params;

        if (!actionName) {
            console.error('Action name is required.');

            return;
        }

        const sanitizedActionName = sanitizeActionName(actionName);
        const actionPath = path.join(__dirname, 'actions', `${sanitizedActionName}.ts`);

        // Check if the action exists in the registry
        const action = ActionRegistry.getAction(sanitizedActionName);
        if (!action) {
            console.error(`Action "${sanitizedActionName}" does not exist.`);

            return;
        }

        // Unregister the action
        delete ActionRegistry.actions[sanitizedActionName];

        // Delete the action file
        try {
            if (fs.existsSync(actionPath)) {
                fs.unlinkSync(actionPath);
                console.log(`Action "${sanitizedActionName}" has been deleted and unregistered.`);
            } else {
                console.error(`Action file "${actionPath}" not found.`);
            }
        } catch (err) {
            console.error('Error deleting action file:', err);
        }
    }
}


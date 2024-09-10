import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { sanitizeActionName } from '../dynamicActionManager';
import { ActionRegistry } from '../actionRegistry';
import * as path from 'path';
import * as fs from 'fs';
import inquirer from 'inquirer';

export class DeleteActionAction extends BaseActionHandler {

    public id = 'deleteAction';
    public name = 'Delete Action';
    public description = 'Moves an existing action file to the deleted-actions directory and unregisters it from the registry.';

    public override isRequired = true; // Prevent this action from being deleted

    public constructor() {
        super(); // Provide the alphanumeric short name
    }

    // Define the required parameter schema
    public override paramsSchema = {};

    public async execute(_: any, params: ActionParams = {}): Promise<void> {

        console.log('Deleting an action...', params);

        // Get all actions and disable the ones that are required
        const deletableActions = Object.values(ActionRegistry.actions).map(action => ({
            name     : `${action.name} (${action.id})`,
            value    : action.id,
            disabled : action.isRequired ? 'Required' : undefined, // Disable required actions
        }));

        if (deletableActions.filter(action => !action.disabled).length === 0) {
            console.log('No actions available for deletion.');

            return;
        }

        // Prompt the user for an action to delete
        const { actionToDelete } = await inquirer.prompt([
            {
                type    : 'list',
                name    : 'actionToDelete',
                message : 'Choose an action to delete:',
                choices : deletableActions,
            },
        ]);

        const sanitizedActionName = sanitizeActionName(actionToDelete);
        const actionPath = path.join(__dirname, 'actions', `${sanitizedActionName}.ts`);
        const deletedActionsDir = path.join(__dirname, '..', 'deleted-actions');
        const deletedActionPath = path.join(deletedActionsDir, `${sanitizedActionName}.ts`);

        // Check if the action exists in the registry
        const action = ActionRegistry.getAction(sanitizedActionName);
        if (!action) {
            console.error(`Action "${sanitizedActionName}" does not exist.`);

            return;
        }

        // Move the action file to the deleted-actions directory
        if (!fs.existsSync(deletedActionsDir))
            fs.mkdirSync(deletedActionsDir);

        try {
            fs.renameSync(actionPath, deletedActionPath);
            console.log(`Action "${sanitizedActionName}" has been moved to "${deletedActionsDir}".`);
        } catch (err) {
            console.error('Error moving action file:', err);
        }

        // Unregister the action
        delete ActionRegistry.actions[sanitizedActionName];
        console.log(`Action "${sanitizedActionName}" has been unregistered.`);
    }
}

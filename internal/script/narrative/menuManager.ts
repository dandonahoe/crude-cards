// /Users/dan/code/crude-cards/internal/script/narrative/menuManager.ts

import inquirer from 'inquirer';
import { ActionRegistry } from './actionRegistry';
import { BaseActionHandler } from './BaseActionHandler';

export class MenuManager {
    // Prompt the user with dynamic menu choices
    public static async promptMenuChoice(): Promise<BaseActionHandler | undefined> {
        const actions = ActionRegistry.getAllActions();

        const choices = actions.map(action => ({
            name  : action.name,
            value : action.id,
        }));

        const answers = await inquirer.prompt([
            {
                type    : 'list',
                name    : 'action',
                message : 'Choose an action:',
                choices,
            },
        ]);

        const selectedAction = ActionRegistry.getAction(answers.action);

        return selectedAction;
    }

    // Prompt for parameters if needed
    public static async promptForParams(_action : BaseActionHandler): Promise<any> {
        // Example: If we want to add parameters to actions, we can prompt for them here
        // For simplicity, we are not using parameters in this example
        return {};
    }
}

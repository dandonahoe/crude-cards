import inquirer from 'inquirer';
import { BaseActionHandler } from './actions/BaseActionHandler';
import { ActionRegistry } from './actionRegistry';

export class MenuManager {
    // Prompt the user with dynamic menu choices
    public static async promptMenuChoice(): Promise<BaseActionHandler | undefined> {
        const actions = ActionRegistry.getAllActions();

        const choices = actions.map(action => ({
            name     : `${action.name} (${action.id})`,
            value    : action.id,
            disabled : action.isRequired ? 'Required' : undefined, // Disable required actions for deletion
        }));

        const answers = await inquirer.prompt([
            {
                type    : 'list',
                name    : 'action',
                message : 'Choose an action:',
                choices,
            },
        ]);

        return ActionRegistry.getAction(answers.action);
    }

    // Prompt for parameters based on the action's schema
    public static async promptForParams(action: BaseActionHandler): Promise<any> {
        if (action.paramsSchema) {
            // Explicitly define the type for the questions array
            const questions = Object.keys(action.paramsSchema).map(param => ({
                type     : 'input',
                name     : param,
                message  : `Enter value for ${param}:`,
                validate : (input: any) => {
                    if (action.paramsSchema![param].required && !input)
                        return `${param} is required`;

                    return true;
                },
            }));

            return await inquirer.prompt(questions as any);
        }

        return {};
    }
}

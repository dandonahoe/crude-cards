import { BaseActionHandler } from './actions/BaseActionHandler';
import { ActionRegistry } from './actionRegistry';
import inquirer from 'inquirer';

export class MenuManager {
    public static async promptMenuChoice(): Promise<BaseActionHandler | undefined> {
        const actions = ActionRegistry.getAllActions();
        const choices = actions.map(action => ({
            name  : `${action.name} (${action.id})`,
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

        return ActionRegistry.getAction(answers.action);
    }

    public static async promptForParams(action: BaseActionHandler): Promise<any> {
        if (action.paramsSchema) {
            const questions = Object.keys(action.paramsSchema).map(param => ({
                type     : 'input',
                name     : param,
                message  : `Enter value for ${param}:`,
                validate : (input: any) => {
                    return action.paramsSchema![param].required && !input
                        ? `${param} is required`
                        : true;
                },
            }));

            return await inquirer.prompt(questions as any);
        }

        return {};
    }
}

// /Users/dan/code/crude-cards/internal/script/narrative/menuManager.ts

import inquirer from 'inquirer';
import { MenuActionHandler } from './actionHandlers';

interface MenuChoice {
    name: string;
    value: string;
}

export class MenuManager {
    private static menuChoices: MenuChoice[] = [];
    private static actionHandlers: Record<string, MenuActionHandler> = {};

    // Register a new menu action
    public static registerMenuAction(actionId: string, displayName: string, handler: MenuActionHandler) {
        MenuManager.menuChoices.push({ name : displayName, value : actionId });
        MenuManager.actionHandlers[actionId] = handler;
    }

    // Prompt the user with dynamic menu
    public static async promptMenuChoice(): Promise<string> {
        const answers = await inquirer.prompt([
            {
                type    : 'list',
                name    : 'action',
                message : 'Choose an action:',
                choices : MenuManager.menuChoices,
            },
        ]);

        return answers.action;
    }

    // Get the handler for a chosen action
    public static getHandler(actionId: string): MenuActionHandler | undefined {
        return MenuManager.actionHandlers[actionId];
    }
}

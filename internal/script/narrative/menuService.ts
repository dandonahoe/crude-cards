// /Users/dan/code/crude-cards/internal/script/narrative/menuService.ts

import inquirer from 'inquirer';
import { MenuAction } from './actionTypes';

export async function selectMenuAction(): Promise<MenuAction> {
    const choices = [
        { name : 'Delete Database', value : MenuAction.DeleteDatabase },
        { name : 'List Database', value : MenuAction.ListDatabase },
        { name : 'Continue Game', value : MenuAction.ContinueGame },
        { name : 'Exit', value : MenuAction.Exit },
    ];

    const answers = await inquirer.prompt([
        {
            type    : 'list',
            name    : 'action',
            message : 'What would you like to do?',
            choices,
        },
    ]);

    return answers.action;
}

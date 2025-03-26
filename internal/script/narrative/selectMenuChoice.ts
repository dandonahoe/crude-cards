import inquirer from 'inquirer';

export async function selectMenuChoice(): Promise<string> {
    const choices = [
        { name : 'Create a new Person node', value : 'create' },
        { name : 'Query all Persons and distances', value : 'query' },
        { name : 'Exit', value : 'exit' },
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

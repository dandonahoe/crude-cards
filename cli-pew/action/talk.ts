import inquirer from 'inquirer';

export const talkAction = async () => {
    // Prompting the user for input using Inquirer
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'stringToSplit',
            message: 'Enter the string you want to split:',
        },
        {
            type: 'input',
            name: 'separator',
            message: 'Enter the separator character (default is ","):',
            default: ',',
        },
        {
            type: 'confirm',
            name: 'firstOnly',
            message: 'Display only the first substring?',
            default: false,
        },
    ]);

    const limit = answers.firstOnly ? 1 : undefined;
    console.log(answers.stringToSplit.split(answers.separator, limit));
};

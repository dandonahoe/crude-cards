import inquirer from 'inquirer';

// Prompt for the initial object or concept description
export async function promptInitialDescription(): Promise<string> {
    const { initialDescription } = await inquirer.prompt([{
        type    : 'input',
        name    : 'initialDescription',
        message : 'Describe an object, entity, or concept (e.g., a bucket, a horse):',
    }]);

    return initialDescription;
}

// Ask the user for refinement, acceptance, or rejection of the description
export async function askForRefinement(): Promise<string> {
    const { refinementOption } = await inquirer.prompt([{
        type    : 'list',
        name    : 'refinementOption',
        message : 'Do you want to refine, accept, or reject the description?',
        choices : [
            { name : 'Refine', value : 'refine' },
            { name : 'Accept', value : 'accept' },
            { name : 'Reject', value : 'reject' },
        ],
    }]);

    return refinementOption;
}

// Get additional feedback or modifications from the user
export async function getUserFeedback(): Promise<string> {
    const { userFeedback } = await inquirer.prompt([{
        type    : 'input',
        name    : 'userFeedback',
        message : 'Provide feedback or refinement for the description:',
    }]);

    return userFeedback;
}

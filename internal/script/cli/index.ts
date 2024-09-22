import { Command } from '@commander-js/extra-typings';
import inquirer from 'inquirer';

const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program
  .command('split')
  .description('Split a string into substrings and display as an array')
  .action(async () => {
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
  });

program.parse();

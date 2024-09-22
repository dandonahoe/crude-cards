import { Command } from '@commander-js/extra-typings';
import { talkAction } from './action/talk';


const program = new Command();


program
    .name('cli')
    .description('Utility Functions for Development and DevOps')
    .version('0.0.1');

program
    .command('talk')
    .description('Testing Sub Actions, Like Talking.')
    .action(talkAction);

program.parse();

import { Command } from '@commander-js/extra-typings';
import { splitAction } from './action/split';

const program = new Command();

program
    .name('pew')
    .description('CLI to some JavaScript string utilities')
    .version('0.8.0');

program
    .command('split')
    .description('Split a string into substrings and display as an array')
    .action(splitAction);

program.parse();

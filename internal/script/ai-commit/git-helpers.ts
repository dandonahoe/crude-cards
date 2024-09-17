import { logColor, Color } from './logger';
import { execSync } from 'child_process';
import parseDiff from 'parse-diff';


export const execCommand = (command: string): string => {
    return execSync(command, { encoding : 'utf-8' });
};


export const getStagedDiff = (): string => {
    return execCommand('git diff --cached');
};


export const parseDiffIntoChunks = (diff: string): string[] => {
    const parsedDiff = parseDiff(diff);

    return parsedDiff.map(file => {

        if (file.to && file.to.includes('package-lock.json')) {

            logColor('Detected package-lock.json, summarizing without diff details.', Color.Yellow);

            return 'The package-lock.json file was updated with many changes.';
        }

        return `File: ${file.to}\nChanges:\n\n${JSON.stringify(file.chunks)}`;
    });
};

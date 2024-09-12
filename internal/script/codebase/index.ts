import { minimatch } from 'minimatch';
import { promises as fs } from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config();

interface ScanConfig {
    fileTypesToScan : string[];
    outputFilePath  : string;
    excludePaths    : string[];
    outputDir       : string;
    srcDir          : string;

}

const scanJobList: ScanConfig[] = [{
    fileTypesToScan : ['.ts', '.tsx'],
    outputFilePath  : path.join(__dirname, './output/codebase-crude-cards-frontend.md'),
    excludePaths    : [],
    outputDir       : path.join(__dirname, './output'),
    srcDir          : path.join(__dirname, '../../../src/ui/game'),
}, {
    fileTypesToScan : ['.ts', '.tsx'],
    outputFilePath  : path.join(__dirname, './output/codebase-crude-cards-backend.md'),
    excludePaths    : [],
    outputDir       : path.join(__dirname, './output'),
    srcDir          : path.join(__dirname, '../../../src/api/src'),
}, {
    fileTypesToScan : ['.ts', '.tsx'],
    outputFilePath  : path.join(__dirname, './output/codebase-attorney-ai.md'),
    outputDir       : path.join(__dirname, './output'),
    srcDir          : path.join(__dirname, '../../../src'),
    excludePaths    : [
        path.join(__dirname, '../../../src/api'),
    ],
}];

// Function to check if a file path should be excluded
const isExcluded = (filePath: string, excludePaths: string[]): boolean => {
    return excludePaths.some(pattern => minimatch(filePath, pattern));
};

// Function to recursively get all files of specified types in a directory
const getAllFiles = async (dir: string, exts: string[], excludePaths: string[]): Promise<string[]> => {
    const files = await fs.readdir(dir, { withFileTypes : true });
    let matchedFiles: string[] = [];

    for (const file of files) {
        const res = path.resolve(dir, file.name);

        if (isExcluded(res, excludePaths)) continue; // Skip excluded paths

        if (file.isDirectory()) {
            // Exclude '__test__' directories and 'migrations' directory within 'src/migrations'
            if (file.name !== '__test__' && !(dir.endsWith('src') && file.name === 'migrations'))
                matchedFiles = matchedFiles.concat(await getAllFiles(res, exts, excludePaths));
        } else {
            if (exts.some(ext => res.endsWith(ext)) && !res.endsWith('.spec.ts'))
                matchedFiles.push(res);
        }
    }

    return matchedFiles;
};

// Function to read and combine content from multiple files
const readAndCombineFiles = async (filePaths: string[]): Promise<string> => {
    let combinedContent = '';

    for (const filePath of filePaths) {
        console.log('Processing', filePath);

        const fileContent = await fs.readFile(filePath, 'utf-8');

        combinedContent += `## ${filePath}\n\n`;
        combinedContent += '```typescript\n';
        combinedContent += fileContent;
        combinedContent += '\n```\n\n';
    }

    return combinedContent;
};

// Main function to execute the script
const main = async (): Promise<void> => {
    try {
        for (const job of scanJobList) {
            // Ensure the output directory exists
            await fs.mkdir(job.outputDir, { recursive : true });

            const matchedFiles = await getAllFiles(job.srcDir, job.fileTypesToScan, job.excludePaths);

            const combinedContent = await readAndCombineFiles(matchedFiles);

            await fs.writeFile(job.outputFilePath, combinedContent, 'utf-8');

            console.log(`Combined file created at ${job.outputFilePath}`);
        }
    } catch (error) {
        console.error('Error combining files:', error);
    }
};

main();

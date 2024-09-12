import { minimatch } from 'minimatch';
import { promises as fs } from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config();

interface ScanConfig {
    fileTypesToScan: string[];
    outputFilePath: string;
    excludePaths: string[];
    outputDir: string;
    srcDir: string;
    outputHeader?: string;
    outputDescription?: string;
}

const scanJobList: ScanConfig[] = [
    {
        fileTypesToScan   : ['.ts', '.tsx'],
        outputFilePath    : path.join(__dirname, './output/codebase-crude-cards-frontend.md'),
        excludePaths      : [],
        outputDir         : path.join(__dirname, './output'),
        srcDir            : path.join(__dirname, '../../../src/ui/game'),
        outputHeader      : '## Frontend Codebase\n\n',
        outputDescription : 'This document contains all the frontend codebase for the Crude Cards game.',
    },
    {
        fileTypesToScan   : ['.ts', '.tsx'],
        outputFilePath    : path.join(__dirname, './output/codebase-crude-cards-backend.md'),
        excludePaths      : [],
        outputDir         : path.join(__dirname, './output'),
        srcDir            : path.join(__dirname, '../../../src/api/src'),
        outputHeader      : '## Backend Codebase\n\n',
        outputDescription : 'This document contains all the backend codebase for the Crude Cards game.',
    },
    {
        fileTypesToScan   : ['.ts', '.tsx'],
        outputFilePath    : path.join(__dirname, './output/codebase-attorney-ai.md'),
        outputDir         : path.join(__dirname, './output'),
        srcDir            : path.join(__dirname, '../../../src'),
        excludePaths      : [path.join(__dirname, '../../../src/api')],
        outputHeader      : '## Attorney AI Codebase\n\n',
        outputDescription : 'This document contains the codebase for the Attorney AI project.',
    },
];

// Function to check if a file path should be excluded
const isExcluded = (filePath: string, excludePaths: string[]): boolean =>
    excludePaths.some(pattern => minimatch(filePath, pattern));

// Function to recursively get all files of specified types in a directory
const getAllFiles = async (dir: string, exts: string[], excludePaths: string[]): Promise<string[]> => {
    const dirents = await fs.readdir(dir, { withFileTypes : true });
    const files = await Promise.all(dirents.map(async dirent => {
        const res = path.resolve(dir, dirent.name);
        if (isExcluded(res, excludePaths)) return [];

        if (dirent.isDirectory()) {
            if (dirent.name === '__test__' || (dir.endsWith('src') && dirent.name === 'migrations')) return [];

            return await getAllFiles(res, exts, excludePaths);
        }

        if (exts.some(ext => res.endsWith(ext)) && !res.endsWith('.spec.ts')) return [res];

        return [];
    }));

    return Array.prototype.concat(...files);
};

// Function to read and combine content from multiple files
const readAndCombineFiles = async (filePaths: string[]): Promise<string> => {
    return (await Promise.all(filePaths.map(async filePath => {
        const fileContent = await fs.readFile(filePath, 'utf-8');

        return `## ${filePath}\n\n\`\`\`typescript\n${fileContent}\n\`\`\`\n\n`;
    }))).join('');
};

// Function to ensure output directory exists
const ensureOutputDir = async (outputDir: string) => {
    try {
        await fs.mkdir(outputDir, { recursive : true });
    } catch (err) {
        console.error(`Error creating directory: ${outputDir}`, err);
        throw err;
    }
};

// Function to write content to file
const writeToFile = async (filePath: string, content: string) => {
    try {
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`Combined file created at ${filePath}`);
    } catch (err) {
        console.error(`Error writing file: ${filePath}`, err);
        throw err;
    }
};

// Function to combine the outputHeader, outputDescription and file content
const generateFinalContent = (header: string = '', description: string = '', content: string): string =>
    `${header}${description}\n\n${content}`;

// Main function to execute the scan jobs
const executeJob = async (job: ScanConfig): Promise<void> => {
    await ensureOutputDir(job.outputDir);
    const matchedFiles = await getAllFiles(job.srcDir, job.fileTypesToScan, job.excludePaths);
    const combinedContent = await readAndCombineFiles(matchedFiles);
    const finalContent = generateFinalContent(job.outputHeader, job.outputDescription, combinedContent);
    await writeToFile(job.outputFilePath, finalContent);
};

// Main execution entry point
const main = async (): Promise<void> => {
    try {
        await Promise.all(scanJobList.map(executeJob));
    } catch (error) {
        console.error('Error during file scanning and combining:', error);
    }
};

main();

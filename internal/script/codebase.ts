import { promises as fs } from 'fs';
import * as path from 'path';
import { minimatch } from 'minimatch';

const outputFilePath = path.join(__dirname, './code/Codebase.md');
const srcDir = path.join(__dirname, '../../src/api/src');

const excludePaths = [
    'internal/script/code/Codebase.md',
    'internal/clio/*/**',
];

const isExcluded = (filePath: string): boolean => {
    return excludePaths.some(pattern => minimatch(filePath, pattern));
};

const getAllFiles = async (dir: string, ext: string): Promise<string[]> => {
    const files = await fs.readdir(dir, { withFileTypes : true });
    let tsFiles: string[] = [];

    for (const file of files) {
        const res = path.resolve(dir, file.name);

        if (isExcluded(res))
            continue; // Skip excluded paths


        if (file.isDirectory()) {
            // Exclude '__test__' directories and 'migrations' directory within 'src/migrations'
            if (file.name !== '__test__' && !(dir.endsWith('src') && file.name === 'migrations'))
                tsFiles = tsFiles.concat(await getAllFiles(res, ext));
        } else {
            if (res.endsWith(ext) && !res.endsWith('.spec.ts'))
                tsFiles.push(res);
        }
    }

    return tsFiles;
};

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

const main = async (): Promise<void> => {
    try {
        const tsFiles = await getAllFiles(srcDir, '.ts');

        const combinedContent = await readAndCombineFiles(tsFiles);

        await fs.writeFile(outputFilePath, combinedContent, 'utf-8');

        console.log(`Combined file created at ${outputFilePath}`);
    } catch (error) {
        console.error('Error combining files:', error);
    }
};

main();

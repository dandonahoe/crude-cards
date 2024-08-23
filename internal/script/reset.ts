import { exec as execCallback, execSync } from 'child_process';
import { promisify } from 'util';
import { rm } from 'fs/promises';
import { join } from 'path';


const exec = promisify(execCallback);

const executeCommandSync = (command : string) : void => {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio : 'inherit' });
};

const executeCommandAsync = async (command : string) : Promise<void> => {
    try {
        console.log(`Executing: ${command}`);
        const { stdout, stderr } = await exec(command);
        if (stderr)
            console.error(`stderr: ${stderr}`);

        console.log(`stdout: ${stdout}`);
    } catch (error) {
        console.error(`Error executing ${command}:`, error);
        throw error;
    }
};

const removeFileOrDirectoryAsync = async (path : string) : Promise<void> => {
    try {
        console.log(`Removing: ${path}`);
        await rm(path, { recursive : true, force : true });
        console.log(`Removed ${path}`);
    } catch (error) {
        console.error(`Error removing ${path}:`, error);
    }
};

const runCommandsInSerial = async (commands : string[]) : Promise<void> => {
    for (const command of commands)
        await executeCommandAsync(command);

};

const main = async () : Promise<void> => {
    process.env.IS_BUILDING = 'true';
    process.env.TZ = 'GMT';

    const pathsToRemove = [
        'package-lock.json',
        'node_modules',
        '.next',
        join('src', 'api', 'package-lock.json'),
        join('src', 'api', 'node_modules'),
        join('src', 'api', '.next'),
    ];

    // Remove files and directories in parallel
    await Promise.all(pathsToRemove.map(removeFileOrDirectoryAsync));

    console.log('Parallel Building...');

    const parallelCommands = [
        'cd src/api && pnpm install',
        'pnpm install',
    ];

    await Promise.all(parallelCommands.map(executeCommandAsync));

    console.log('Setting up the database...');

    // const serialCommands = [
    //     'pnpm run db:format',
    //     'pnpm run db:validate',
    // ];

    // await runCommandsInSerial(serialCommands);

    const parallelFinishingCommands = [
        'pnpm run test',
        'pnpm run build',
    ];

    await Promise.all(parallelFinishingCommands.map(executeCommandAsync));

    // Launch VSCode
    executeCommandSync('code');
};

main().catch(error => {
    console.error('Error in main execution:', error);
});

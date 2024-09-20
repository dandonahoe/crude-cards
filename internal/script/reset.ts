import { exec as execCallback, execSync } from 'child_process';
import { promisify } from 'util';
import { rename, rm, mkdir } from 'fs/promises';
import { join, resolve } from 'path';

const exec = promisify(execCallback);

const spinnerFrames = ['|', '/', '-', '\\']; // Spinner animation frames
const trashDir = resolve('./trash'); // Directory for moved files

// Helper function to move the cursor up in the terminal by n lines
const moveCursorUp = (n: number): void => {
    process.stdout.write(`\x1b[${n}A`);
};

// Helper function to move the cursor down by n lines
const moveCursorDown = (n: number): void => {
    process.stdout.write(`\x1b[${n}B`);
};

// Helper function to clear the current line entirely
const clearLine = (): void => {
    process.stdout.write('\x1b[2K\r');
};

// Class to manage multiple spinners
class SpinnerManager {
    private spinners: { message: string; frameIndex: number; completed: boolean }[] = [];
    private intervalId?: NodeJS.Timeout;

    public addSpinner(message: string): void {
        this.spinners.push({ message, frameIndex : 0, completed : false });
        this.render(); // Render immediately when a spinner is added
    }

    public completeSpinner(index: number, message: string): void {
        if (this.spinners[index]) {
            this.spinners[index].completed = true;
            this.spinners[index].message = `✔ ${message} completed!`;
            this.render();
        }
    }

    public start(): void {
        this.intervalId = setInterval(() => {
            this.updateFrames();
            this.render();
        }, 100); // Update the spinner every 100ms
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    private updateFrames(): void {
        for (const spinner of this.spinners)
            if (!spinner.completed)
                spinner.frameIndex = (spinner.frameIndex + 1) % spinnerFrames.length;


    }

    private render(): void {
        moveCursorUp(this.spinners.length); // Move the cursor up to the start of the spinner list
        for (let i = 0; i < this.spinners.length; i++) {
            clearLine(); // Clear the current line
            const spinner = this.spinners[i];
            if (spinner.completed) {
                // Print the success or failure message
                console.log(spinner.message);
            } else {
                // Print the spinning frame with the message
                const frame = spinnerFrames[spinner.frameIndex];
                console.log(`${frame} ${spinner.message}`);
            }
        }
        moveCursorDown(this.spinners.length); // Move back down to the bottom of the spinner list
    }
}

// Create a spinner manager to handle multiple concurrent spinners
const spinnerManager = new SpinnerManager();

// Helper to move directories to './trash'
const moveToTrashAsync = async (path: string, trashPath: string, spinnerIndex: number): Promise<void> => {
    spinnerManager.addSpinner(`Moving to trash: ${path}`);
    try {
        await rename(path, trashPath);
        spinnerManager.completeSpinner(spinnerIndex, `Moved to trash: ${path}`);
    } catch (error) {
        if (error instanceof Error)
            console.error(`Error moving ${path} to trash: ${error.message}`);
         else
            console.error(`Unknown error moving ${path} to trash`);

        spinnerManager.completeSpinner(spinnerIndex, `Failed to move: ${path}`);
    }
};

// Helper to delete directories asynchronously
const deleteFromTrashAsync = async (path: string, spinnerIndex: number): Promise<void> => {
    spinnerManager.addSpinner(`Deleting from trash: ${path}`);
    try {
        await rm(path, { recursive : true, force : true });
        spinnerManager.completeSpinner(spinnerIndex, `Deleted from trash: ${path}`);
    } catch (error) {
        if (error instanceof Error)
            console.error(`Error deleting ${path} from trash: ${error.message}`);
         else
            console.error(`Unknown error deleting ${path} from trash`);

        spinnerManager.completeSpinner(spinnerIndex, `Failed to delete: ${path}`);
    }
};

// Helper to execute a command asynchronously with spinner
const executeCommandAsync = async (command: string, spinnerIndex: number): Promise<void> => {
    spinnerManager.addSpinner(`Executing: ${command}`);
    try {
        const { stdout, stderr } = await exec(command);
        if (stderr)
            console.error(`stderr: ${stderr}`);

        console.log(stdout);
        spinnerManager.completeSpinner(spinnerIndex, `Executed: ${command}`);
    } catch (error) {
        if (error instanceof Error)
            console.error(`Error executing (async) ${command}: ${error.message}`);
         else
            console.error(`Unknown error executing (async) ${command}`);

        spinnerManager.completeSpinner(spinnerIndex, `Failed: ${command}`);
        throw error;
    }
};

const main = async (): Promise<void> => {
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

    // Start spinner manager
    spinnerManager.start();

    console.log('Moving directories to trash...');

    // Ensure the trash directory exists
    await mkdir(trashDir, { recursive : true });

    // Move files and directories to the trash in parallel
    const trashPaths = pathsToRemove.map(path => join(trashDir, path.replace(/\//g, '_')));

    await Promise.all(
        pathsToRemove.map((path, index) =>
            moveToTrashAsync(path, trashPaths[index], index),
        ),
    );

    console.log('Directories moved to trash.');

    console.log('Starting delete and install commands in parallel...');

    // Delete the directories in trash and run install commands in parallel
    const parallelDeletes = trashPaths.map((path, index) =>
        deleteFromTrashAsync(path, index),
    );

    const installCommands = [
        'pnpm --prefix=src/api install',
        'pnpm install',
    ].map((command, index) =>
        executeCommandAsync(command, trashPaths.length + index),
    );

    // Run all deletes and installs in parallel, and wait for all to complete before moving on
    await Promise.all([...parallelDeletes, ...installCommands]);

    console.log('Delete and installation tasks complete.');

    console.log('Starting final commands (test and build)...');

    // Run finishing commands in parallel
    const parallelFinishingCommands = [
        'pnpm run test',
        'pnpm run build',
    ].map((command, index) =>
        executeCommandAsync(command, trashPaths.length + installCommands.length + index),
    );

    // Wait for the finishing commands to complete
    await Promise.all(parallelFinishingCommands);

    console.log('Final test and build tasks complete.');

    // Stop spinner manager once all tasks are complete
    spinnerManager.stop();

    console.log('Launching VSCode...');
    executeCommandSync('code');
};

// Synchronous command executor remains the same
const executeCommandSync = (command: string): void => {
    console.log(`Executing: ${command}`);
    try {
        execSync(command, { stdio : 'inherit' });
        console.log(`✔ Successfully executed: ${command}`);
    } catch (error) {
        if (error instanceof Error)
            console.error(`Error executing (sync) ${command}: ${error.message}`);
         else
            console.error(`Unknown error executing (sync) ${command}`);


        throw error;
    }
};

main().catch(error => {
    if (error instanceof Error)
        console.error('Error in main execution:', error.message);
     else
        console.error('Unknown error in main execution.');

});

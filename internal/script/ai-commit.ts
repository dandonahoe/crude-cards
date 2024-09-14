import { execSync } from 'child_process';
import parseDiff from 'parse-diff';
import OpenAI from 'openai';

// Type Definitions and Interfaces
interface ChatCompletionParams {
    temperature: number;
    max_tokens: number;
    messages: { role: string; content: string }[];
    model: string;
}

// Enum for colorized output
enum Color {
    Reset = "\x1b[0m",
    Red = "\x1b[31m",
    Green = "\x1b[32m",
    Yellow = "\x1b[33m",
    Blue = "\x1b[34m",
    Magenta = "\x1b[35m",
    Cyan = "\x1b[36m",
}

// Constants
const ProgressBarWidth = 30; // Width of the progress bar in characters
const OpenApiModel = 'gpt-4'; // OpenAI model used for completions
const Temperature = 0.6; // Temperature for text generation randomness
const MaxTokens = 1500; // Maximum tokens for OpenAI API completion
const ProgressBarChars = ['=', '-', '*', '~', '#']; // Different characters for animation

// Spinner state
let spinnerInterval: NodeJS.Timeout | null = null;
let progress = 0; // Tracks progress for the progress bar

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY,
});

// Utility Functions

// Log colorized messages to the terminal
const logColor = (message: string, color: Color = Color.Reset): void => {
    console.log(`${color}${message}${Color.Reset}`);
};

// Execute a shell command and return the output
const execCommand = (command: string): string => {
    return execSync(command, { encoding : 'utf-8' });
};

// Helper to generate an RGB color code
const rgbColor = (r: number, g: number, b: number): string => {
    return `\x1b[38;2;${r};${g};${b}m`;
};

// Generate a psychedelic color gradient that cycles across the bar
const psychedelicColor = (index: number): string => {
    const r = Math.floor(128 + 128 * Math.sin(index / 5));
    const g = Math.floor(128 + 128 * Math.sin((index / 5) + 2));
    const b = Math.floor(128 + 128 * Math.sin((index / 5) + 4));

    return rgbColor(r, g, b);
};

// Start a psychedelic progress bar spinner
const startSpinner = (): void => {
    progress = 0;
    process.stdout.write('\x1b[?25l'); // Hide cursor
    spinnerInterval = setInterval(() => {
        progress = (progress + 1) % (ProgressBarWidth + 1);

        // Build a random, colorful progress bar with varying characters and colors
        const progressBar = Array.from({ length : ProgressBarWidth }, (_, i) => {
            const color = psychedelicColor(progress + i);
            const char = ProgressBarChars[Math.floor(Math.random() * ProgressBarChars.length)];

            return `${color}${char}${Color.Reset}`;
        }).join('');

        process.stdout.write(`\r[${progressBar}]`);
    }, 100); // Updates every 100ms
};

// Stop the spinner animation
const stopSpinner = (): void => {
    if (spinnerInterval) {
        clearInterval(spinnerInterval);
        spinnerInterval = null;
    }
    process.stdout.write('\r \x1b[?25h'); // Show cursor
};

// OpenAI API Interaction

// Create a text completion using OpenAI's API
const createCompletion = async (prompt: string): Promise<string> => {
    const params: ChatCompletionParams = {
        model       : OpenApiModel,
        messages    : [{ role : 'user', content : prompt }],
        max_tokens  : MaxTokens,
        temperature : Temperature,
    };

    startSpinner();
    const chatCompletion = await openai.chat.completions.create(params as any);
    stopSpinner();

    return chatCompletion.choices[0].message.content!.trim();
};

// Git and Diff Handling

// Get the diff of staged changes
const getStagedDiff = (): string => {
    return execCommand('git diff --cached');
};

// Parse the diff into chunks and summarize
const parseDiffIntoChunks = (diff: string): string[] => {
    const parsedDiff = parseDiff(diff);

    const chunks = parsedDiff.map(file => {
        if (file.to && file.to.includes('package-lock.json')) {
            logColor('Detected package-lock.json, summarizing without diff details.', Color.Yellow);

            return 'The package-lock.json file was updated with lots of changes.';
        }

        return `File: ${file.to}\nChanges:\n\n${JSON.stringify(file.chunks)}`;
    });

    logColor(`Total chunks generated: ${chunks.length}`, Color.Green);

    return chunks;
};

// Commit message generation

// Generate a final commit message from file summaries
const generateCommitMessage = async (fileSummaries: string[]): Promise<string> => {
    const combinedPrompt = fileSummaries.join('\n\n');

    const finalCommitMessage = await createCompletion(`
        Summarize the following file summaries into a commit message.
        Title formatted as "feat(subject): summary" where 'feat' is one of:
        feat, fix, perf, docs, style, refactor, test, build, ci, chore, revert.

        Subject should be a single word describing the change. Bullet points
        should list the files involved, describing the updates in one word.
        The final line should note any unusual details, such as breaking changes.

        ${combinedPrompt}
    `);

    return finalCommitMessage.replace(/`/g, '').trim(); // Sanitize message for git
};

// Main Execution Flow

const main = async (): Promise<void> => {
    logColor('Starting commit message generation...', Color.Cyan);

    // Stage all changes
    execCommand('git add .');

    // Get staged changes
    const diff = getStagedDiff();

    // Handle case where there are no pending changes
    if (!diff.trim()) {
        logColor('No changes to commit. Exiting...', Color.Yellow);
        process.exit(0);
    }

    // Parse the diff into manageable chunks
    const fileSummaries = parseDiffIntoChunks(diff);

    // Generate summaries for each file in parallel using Promise.all
    const summaryPromises = fileSummaries.map(summary =>
        createCompletion(`Summarize the file diff for commit. Provide statistics at the end: ${summary.slice(0, 1000)}`),
    );
    const fileSummariesResponses = await Promise.all(summaryPromises);

    // Generate final commit message
    const finalCommitMessage = await generateCommitMessage(fileSummariesResponses);

    // Commit the staged changes with the generated commit message
    execCommand(`git commit -F - <<EOF
${finalCommitMessage}
EOF`);

    logColor('\nGenerated commit message:\n', Color.Blue);
    console.log(finalCommitMessage);
    logColor('\nCommit successfully generated!', Color.Green);
};

// Error handling and execution
main().catch(error => {
    logColor('Error:', Color.Red);
    console.error(error.stack);
});

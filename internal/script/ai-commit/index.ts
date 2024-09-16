/* eslint-disable max-len */

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

interface ChatCompletionResponse {
    choices: { message: { content: string | null } }[];
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
const OpenApiModel = 'gpt-4';
const Temperature = 1;
const MaxTokens = 1500;

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY,
});

// Utility Functions

/**
 * Logs colorized messages to the terminal
 * @param message - The message to log
 * @param color - The color to use
 */
export const logColor = (message: string, color: Color = Color.Reset): void => {
    console.log(`${color}${message}${Color.Reset}`);
};

/**
 * Executes a shell command and returns the output
 * @param command - The shell command to execute
 * @returns The output of the command
 */
export const execCommand = (command: string): string => {
    return execSync(command, { encoding : 'utf-8' });
};

/**
 * Displays a loading spinner for a set duration (useful during API requests)
 */
export const displaySpinner = (message: string) => {
    const spinnerChars = ['|', '/', '-', '\\'];
    let i = 0;

    const spinnerInterval = setInterval(() => {
        process.stdout.write(`\r${spinnerChars[i++ % spinnerChars.length]} ${message}`);
    }, 100);

    return () => clearInterval(spinnerInterval);
};

// OpenAI API Interaction

/**
 * Handles multi-part completions by making multiple requests until the full response is received.
 * @param prompt - The prompt to send to the API
 * @returns The complete generated response
 */
export const createCompletion = async (prompt: string): Promise<string> => {
    const params: ChatCompletionParams = {
        model       : OpenApiModel,
        messages    : [{ role : 'user', content : prompt }],
        max_tokens  : MaxTokens,
        temperature : Temperature,
    };

    let fullResponse = '';
    let incomplete = true;

    // Show spinner while waiting for API completion
    const stopSpinner = displaySpinner('Waiting for OpenAI API response...');

    while (incomplete)
        try {
            const chatCompletion: ChatCompletionResponse = await openai.chat.completions.create(params as any);
            const responseContent = chatCompletion.choices[0].message.content;

            if (responseContent)
                fullResponse += responseContent.trim();


            // Check if the response is fully complete or if more calls are needed
            incomplete = responseContent ? responseContent.length >= MaxTokens : false;

            // Update the prompt with the last part of the message for multi-part continuation
            if (incomplete)
                params.messages.push({ role : 'user', content : 'Continue from the last point.' });

        } catch (error) {
            stopSpinner(); // Stop spinner in case of error
            console.error(error);
            throw new Error('Error during API call');
        }

    stopSpinner(); // Stop spinner after completion

    return fullResponse;
};

// Git and Diff Handling

/**
 * Gets the diff of staged changes
 * @returns The git diff of staged changes
 */
export const getStagedDiff = (): string => {
    return execCommand('git diff --cached');
};

/**
 * Parses the diff into chunks and returns summaries
 * @param diff - The raw diff from git
 * @returns An array of file summaries
 */
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

// Commit message generation

/**
 * Generates a final commit message from file summaries
 * @param fileSummaries - An array of file summaries
 * @returns The generated commit message
 */
export const generateCommitMessage = async (fileSummaries: string[]): Promise<string> => {
    const combinedPrompt = fileSummaries.join('\n\n');

    const finalCommitMessage = await createCompletion(`
**Summarize the following file summaries into a concise, human-readable commit message.**

- The commit message should follow this format:
  \`"feat(noun): short description"\` or \`"fix(noun): short description"\`, where the noun is the subject of the change.

- Use these keywords for the commit type: feat, fix, perf, docs, style, refactor, test, build, ci, chore, revert.

- For a single commit, multiple \`"feat(noun): short description"\` entries may be generated to explain different changes.

- When mentioning a file, put the file name alone on a new item line

- Each message should include:
  1. A **concise subject** describing the main change (3-9 words max).
  2. A **description** of what was done (e.g., 'updated error handling for Chinese character sets', 'added login validation, which should improve performance on MacBooks').
  3. For multiple changes, generate a list of messages using bullet points.

- Use **short, clear file names** (placed on a new item line) or relevant directories (if multiple files share the same purpose) to describe where changes occurred, rather than long file paths.

- Avoid phrases like "changed lots of things" or "made updates"; be specific, but **keep the description short and to the point**.

- The commit message should be structured for easy readability:
    - Bullet points for multiple entries
    - A tree-style structure to categorize related changes, when applicable

- Example output for a **simple important change**:

  \`\`\`markdown
  feat(auth): add login validation to improve security

  - Added validation for login form inputs.
  - Prevented empty email submissions.
  - Improved error messages for incorrect passwords.
  \`\`\`

- Example output for **lots of random fixes**:

  \`\`\`markdown
  fix(auth): resolve multiple validation and session issues
  - src/index.tsx
  - Corrected input validation for user registration.
  - Fixed session persistence for user logins.
  - Updated password reset form to handle edge cases.
  - Refactored error handling to provide clearer feedback.

  refactor(ui): improve button alignment and spacing
  - src/components/Button.tsx
  - Standardized button layout across all forms.
  - Improved padding on the mobile login screen.
  - Updated CSS to fix alignment issues on small screens.

  perf(api): optimize database queries for user profiles
  - src/api/user.ts
  - Reduced query time for user profile fetches.
  - Optimized user search functionality in admin panel.

  **BREAKING CHANGE:** Session handling logic has been updated. All sessions will be reset after this update.
  \`\`\`

DATA TO ANALYZE:

        ${combinedPrompt}
    `);

    return finalCommitMessage.replace(/`/g, '').trim(); // Sanitize message for git
};

// Main Execution Flow

/**
 * Main function to execute the flow
 */
export const main = async (): Promise<void> => {
    logColor('Starting commit message generation...', Color.Cyan);

    // Stage all changes
    logColor('Staging changes...', Color.Magenta);
    execCommand('git add .');

    // Get staged changes
    logColor('Fetching staged diff...', Color.Magenta);
    const diff = getStagedDiff();

    // Handle case where there are no pending changes
    if (!diff.trim()) {
        logColor('No changes to commit. Exiting...', Color.Yellow);
        process.exit(0);
    }

    // Parse the diff into manageable chunks
    logColor('Parsing staged changes...', Color.Magenta);
    const fileSummaries = parseDiffIntoChunks(diff);

    // Generate summaries for each file in parallel using Promise.all
    logColor('Summarizing file diffs...', Color.Magenta);
    const summaryPromises = fileSummaries.map(summary =>
        createCompletion(`Summarize the file diff for commit. Provide statistics at the end: ${summary.slice(0, 1000)}`),
    );
    const fileSummariesResponses = await Promise.all(summaryPromises);

    // Generate final commit message
    logColor('Generating commit message...', Color.Magenta);
    const finalCommitMessage = await generateCommitMessage(fileSummariesResponses);

    // Commit the staged changes with the generated commit message
    logColor('Committing changes...', Color.Magenta);
    execCommand(`git commit -m "${finalCommitMessage}"`);

    logColor('\nGenerated commit message:\n', Color.Blue);
    console.log(finalCommitMessage);
    logColor('\nCommit successfully generated!', Color.Green);
};

// Error handling and execution
main().catch(error => {
    logColor('Error:', Color.Red);
    console.error(error.stack);
});

/* eslint-enable max-len */

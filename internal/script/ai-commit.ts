import { execSync } from 'child_process';
import parseDiff from 'parse-diff';
import OpenAI from 'openai';

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
});

// Function to execute a shell command and return the output as a string
function execCommand(command: string): string {
    const output = execSync(command, { encoding : 'utf-8' });

    return output;
}

// Function to get the diff of staged changes
function getStagedDiff(): string {
    const diff = execCommand('git diff --cached');

    return diff;
}

/**
 * Creates a text completion using OpenAI's API.
 *
 * @param prompt - The prompt to send to the AI for completion.
 * @returns A promise resolving to the generated commit message.
 */
const createCompletion = async (prompt: string): Promise<string> => {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
        model    : 'gpt-4',
        messages : [{
            role    : 'user',
            content : prompt,
        }],
        max_tokens  : 1500,
        temperature : 0.6,
    };

    const chatCompletion = await openai.chat.completions.create(params);

    return chatCompletion.choices[0].message.content!.trim();
};

// ANSI color codes
const colors = {
    reset   : "\x1b[0m",
    red     : "\x1b[31m",
    green   : "\x1b[32m",
    yellow  : "\x1b[33m",
    blue    : "\x1b[34m",
    magenta : "\x1b[35m",
    cyan    : "\x1b[36m",
};

// Helper function to log colorized messages
function logColor(message: string, color: string = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

// Function to parse the diff into chunks and handle large files
function parseDiffIntoChunks(diff: string): string[] {
    const parsedDiff = parseDiff(diff);

    const chunks = parsedDiff.map(file => {
        if (file.to && file.to.includes('package-lock.json')) {
            logColor('Detected package-lock.json, summarizing without diff details.', colors.yellow);

            return `The package-lock.json file was updated with lots of changes.`;
        }

        const chunkSummary = `File: ${file.to}\nChanges:\n\n${JSON.stringify(file.chunks)}`;

        return chunkSummary;
    });

    logColor(`Total chunks generated: ${chunks.length}`, colors.green);

    return chunks;
}

// Main function to run the script
async function main() {
    logColor('Starting commit message generation...', colors.cyan);

    // Stage all changes
    execCommand('git add .');

    // Get the diff of staged changes
    const diff = getStagedDiff();

    // Parse the diff into manageable chunks
    const fileSummaries = parseDiffIntoChunks(diff);

    // Generate summaries for each file in parallel using Promise.all
    const summaryPromises = fileSummaries.map(summary =>
        createCompletion(`Summarize the file diff in a commit. Provide a few statistics at the end ${summary.slice(0, 1000)}`),
    );
    const fileSummariesResponses = await Promise.all(summaryPromises);

    const combinedPrompt = fileSummariesResponses.join('\n\n');

    // Generate the final commit message based on the combined summary
    const finalCommitMessage = await createCompletion(
        `Summarize the following file summaries into a commit
message, using plain text and bullet points, no other markdown. title formatted as "feat(subject): summary" where feat is of
type:
feat
fix
perf
docs
style
refactor
test
build
ci
chore
revert

and subject is a single alphanumeric word describing the
change. Bullet points should also be formatted like titles, ie "feat(subject): description" and
an indented bulletpoints listing the files involved, with
"subject" describing the update in one word and not just a file name, then one more line
giving a detailed description of the change in understandable terms but can use tech language.
The final line should note if there is anything unusual or noteworthy, such as breaking code.
Include a title, bullet points, and statistics in the commit message.

${combinedPrompt}`,
    );

    const sanitizedCommitMessage = finalCommitMessage.replaceAll('`', '').trim();

    // Commit the staged changes with the generated commit message
    execCommand(`git commit -F - <<EOF
${sanitizedCommitMessage}
EOF`);

    logColor('\nGenerated commit message:', colors.blue);
    console.log(sanitizedCommitMessage);
    logColor('Commit successfully generated!', colors.green);

    // Generate ASCII art
    const codeSample = `
        '\x1b[38;2;255;0;0m     Color         \x1b[0m'
        '\x1b[38;2;255;128;0m   :) Multi line ASCII Art in Color! ()()  \x1b[0m'
    `;

    let asciiArt = await createCompletion(`Generate ascii art for the terminal. It should
        display ascii art to indicate the operation completed appropriately. No more than
        500 characters wide. Do not include \`\`\`plaintext start, just content.
         Use the following code snippet as a reference
        for what we intend to display.
        ${codeSample}`);

    asciiArt = asciiArt.replaceAll('```plaintext', '').trim();
    asciiArt = asciiArt.replaceAll('```', '').trim();

    logColor(asciiArt, colors.magenta);
}

// Run the main function
main().catch(error => {
    logColor('Error:', colors.red);
    console.error(error.stack);
});

import { execSync } from 'child_process';
import parseDiff from 'parse-diff';
import OpenAI from 'openai';

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
});

// Function to execute a shell command and return the output as a string
function execCommand(command: string): string {
    return execSync(command, { encoding : 'utf-8' });
}

// Function to get the diff of staged changes
function getStagedDiff(): string {
    return execCommand('git diff --cached');
}

/**
 * Creates a text completion using OpenAI's API.
 *
 * @param prompt - The prompt to send to the AI for completion.
 * @returns A promise resolving to the generated commit message.
 */
const createCompletion = async (prompt: string): Promise<string> => {

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
        model    : 'gpt-4o',
        messages : [{
            role    : 'user',
            content : prompt,
        }],
        max_tokens  : 150,
        temperature : 0.7,
    };

    const chatCompletion = await openai.chat.completions.create(params);

    return chatCompletion.choices[0].message.content!.trim();
};

// Function to parse the diff into chunks and handle large files
function parseDiffIntoChunks(diff: string): string[] {
    const parsedDiff = parseDiff(diff);

    return parsedDiff.map(file => {
        // Check if the file is large based on some heuristic, e.g., length of the diff
        if (file.to && file.to.includes('package-lock.json'))
            return `The package-lock.json file was updated with lots of changes.`;

        // Include the file name in the summary
        return `File: ${file.to}\nChanges:\n\n${JSON.stringify(file.chunks)}`;
    });
}

// Main function to run the script
async function main() {
    console.log('Starting commit message generation...');

    // Stage all changes
    execCommand('git add .');

    // Get the diff of staged changes
    const diff = getStagedDiff();

    // Parse the diff into manageable chunks
    const fileSummaries = parseDiffIntoChunks(diff);

    // Combine all file summaries into one prompt
    const combinedPrompt = `Generate a cohesive commit message for the following file changes.
    Begin with the commit message (no leading ticks or markdown)
    and do not include any trailing comments. Purely the message.
    Do not include special characters, just alpha numeric. :\n\n${fileSummaries.join('\n\n')}`;

    // Generate the final commit message
    let finalCommitMessage = await createCompletion(combinedPrompt);

    finalCommitMessage = finalCommitMessage
        .replaceAll('`', '')
        .trim();

    // Commit the staged changes with the generated commit message
    execCommand(`git commit -F - <<EOF
${finalCommitMessage}
EOF`);

    console.log('Changes committed successfully with the generated commit message:\n\n---------------------------');
    console.log(finalCommitMessage);
    console.log('---------------------------\n\n');
}

// Run the main function
main().catch(error => console.error('Error:', error));

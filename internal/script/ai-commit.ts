import { execSync } from 'child_process';
import parseDiff from 'parse-diff';
import OpenAI from 'openai';

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
});

// Function to execute a shell command and return the output as a string
function execCommand(command: string): string {
    console.log(`Executing command: ${command}`);
    const output = execSync(command, { encoding : 'utf-8' });
    console.log(`Command output:\n${output}`);

    return output;
}

// Function to get the diff of staged changes
function getStagedDiff(): string {
    console.log('Getting staged diff...');
    const diff = execCommand('git diff --cached');
    console.log(`Staged diff:\n${diff}`);

    return diff;
}

/**
 * Creates a text completion using OpenAI's API.
 *
 * @param prompt - The prompt to send to the AI for completion.
 * @returns A promise resolving to the generated commit message.
 */
const
createCompletion = async (prompt: string): Promise<string> =>
     {
    console.log(`Creating completion for prompt:\n${prompt}`);

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
    const result = chatCompletion.choices[0].message.content!.trim();

    console.log(`Received completion:\n${result}`);

    return result;
};

// Function to parse the diff into chunks and handle large files
function parseDiffIntoChunks(diff: string): string[] {
    console.log('Parsing diff into chunks...');
    const parsedDiff = parseDiff(diff);

    const chunks = parsedDiff.map(file => {
        // Check if the file is large based on some heuristic, e.g., length of the diff
        if (file.to && file.to.includes('package-lock.json')) {
            console.log('Detected package-lock.json, summarizing without diff details.');

            return `The package-lock.json file was updated with lots of changes.`;
        }

        // Include the file name in the summary
        const chunkSummary = `File: ${file.to}\nChanges:\n\n${JSON.stringify(file.chunks)}`;
        console.log(`Generated chunk summary for ${file.to}:\n${chunkSummary.slice(0, 150)}`);

        return chunkSummary;
    });

    console.log(`Total chunks generated: ${chunks.length}`);

    return chunks;
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

    console.log('Generating individual file summaries via OpenAI...');

    // Generate summaries for each file in parallel using Promise.all
    const summaryPromises = fileSummaries.map(summary =>
        createCompletion(`Summarize the file diff in a commit. Provide a few statistics at the end ${summary.slice(0, 50)}`),
    );
    const fileSummariesResponses = await Promise.all(summaryPromises);

    console.log('Received all file summaries from OpenAI:');
    fileSummariesResponses.forEach((response, index) => {
        console.log(`Summary ${index + 1}:\n${response.slice(0, 50)}`);
    });

    // Combine the individual file summaries into a single prompt for the final completion
    const combinedPrompt = fileSummariesResponses.join('\n\n');
    console.log(`Combined prompt for final commit message:\n${combinedPrompt.slice(0, 50)}...`);

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

    // fully sanitize this to allow simple characters which will not trip up a git commit message
    const sanitizedCommitMessage = finalCommitMessage.replaceAll('`', '').trim();
    console.log(`\n\n\n-------------------------------\n\n\n\nFinal commit message:\n\n`);

    // Commit the staged changes with the generated commit message
    execCommand(`git commit -F - <<EOF
${sanitizedCommitMessage}
EOF`);

    console.log('\n\n\n\n\n-------------------------------\nChanges committed successfully with the generated commit message.');
}

// Run the main function
main().catch(error => {
    console.error('Error:', error);
    console.error(error.stack);
});

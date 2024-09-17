import { createCompletion } from './ai-helpers';


export const generateCommitMessage = async (fileSummaries: string[]): Promise<string> => {
    const combinedPrompt = fileSummaries.join('\n\n');

    const finalCommitMessage = await createCompletion(`
**Summarize the following file summaries into a concise, human-readable commit message.**

- Follow the format and guidelines as mentioned...

DATA TO ANALYZE:
${combinedPrompt}
    `);

    return finalCommitMessage.replace(/`/g, '').trim();
};

export { createCompletion };


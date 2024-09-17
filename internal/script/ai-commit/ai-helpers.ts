import { ChatCompletionParams, ChatCompletionResponse } from './type';
import { OpenApiModel, Temperature, MaxTokens } from './constant';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY,
});


export const createCompletion = async (prompt: string): Promise<string> => {
    const params: ChatCompletionParams = {
        model       : OpenApiModel,
        messages    : [{ role : 'user', content : prompt }],
        max_tokens  : MaxTokens,
        temperature : Temperature,
    };

    let fullResponse = '';
    let incomplete = true;

    while (incomplete)
        try {
            const chatCompletion: ChatCompletionResponse = await openai.chat.completions.create(params as any);
            const responseContent = chatCompletion.choices[0].message.content;

            if (responseContent)
                fullResponse += responseContent.trim();


            incomplete = responseContent ? responseContent.length >= MaxTokens : false;

            if (incomplete)
                params.messages.push({ role : 'user', content : 'Continue from the last point.' });


        } catch (error) {
            console.error(error);
            throw new Error('Error during API call');
        }


    return fullResponse;
};

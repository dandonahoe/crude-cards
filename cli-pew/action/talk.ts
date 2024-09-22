import { createClient } from "@deepgram/sdk";
import * as dotenv from 'dotenv';
// - or -
// const { createClient } = require("@deepgram/sdk");

dotenv.config();

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

export const talkAction = async () => {

    console.log('Talk action', deepgram.version);
};

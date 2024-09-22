
import { webvtt, createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import * as dotenv from 'dotenv';

dotenv.config();

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

export const talkAction = async () => {

    const dgConnection = deepgram.listen.live({ model: "nova" });

    dgConnection.on(LiveTranscriptionEvents.Open, () => {
        dgConnection.on(LiveTranscriptionEvents.Transcript, (data) => {
            console.log(data);
        });

        source.addListener("got-some-audio", async (event) => {
            dgConnection.send(event.raw_audio_data);
        });
    });

};

import fs from "fs"; // filesystem module
import path from "path"; // path module
import OpenAI from "openai"; // OpenAI SDK

const speechFile = path.resolve(`./${Date()}.mp3`); // path and filename for the speech file
import { config } from "dotenv";
config();


// Create a new instance of the OpenAI object with your API key
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});


// The main function to create speech
async function main() {

    const mp3 = await openai.audio.speech.create({

      model: "tts-1",
      voice: "echo", // OPTIONS include (alloy, echo, fable, onyx, nova, and shimmer)
      input: "Hello, my name is Chad Bot. What do you want to chat about?" // 126 characters = about $0.00189 for tts-1, tts-1-hd is 2x more cost than regular tts-1

    });

    console.log(speechFile); // log the path where the speech file saved

    const buffer = Buffer.from(await mp3.arrayBuffer()); // convert the response to a buffer

    await fs.promises.writeFile(speechFile, buffer); // write the buffer to a file

};

main();

// Usage: Please note that our Usage Policies require you to provide a clear disclosure to end users that the TTS voice they are hearing is AI-generated and not a human voice.
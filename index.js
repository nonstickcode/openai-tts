import fs from "fs"; // filesystem module
import path from "path"; // path module
import OpenAI from "openai"; // OpenAI SDK
import admin from "firebase-admin"; // Firebase Admin SDK



// Initialize Firebase Admin SDK
const serviceAccount = require("./path/to/your/serviceAccountKey.json"); // Replace with the path to your Firebase service account key JSON file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-firebase-storage-bucket-url",
});

const bucket = admin.storage().bucket();



const speechFile = path.resolve(`./audio-files/${Date()}.mp3`); // path and filename for the speech file
import { config } from "dotenv";
config();


// Create a new instance of the OpenAI object with your API key
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

//
// The main function to create speech
async function main() {

    const mp3 = await openai.audio.speech.create({

      model: "tts-1", // tts-1 or tts-1-hd
      voice: "onyx", // OPTIONS include (alloy, echo, fable, + onyx, nova, and shimmer)
      input: "Hheyy, if I had a voiiice... I'd prolly say, Hey th-… thhank yoou forrr turnin onn thhhe Chadd" 
      
      // 126 characters = about $0.00189 for tts-1, tts-1-hd is 2x more cost than regular tts-1

    });

    console.log(speechFile); // log the path where the speech file saved

    const buffer = Buffer.from(await mp3.arrayBuffer()); // convert the response to a buffer

    await fs.promises.writeFile(speechFile, buffer); // write the buffer to a file

};

main();

// Usage: Please note that our Usage Policies require you to provide a clear disclosure to end users that the TTS voice they are hearing is AI-generated and not a human voice.
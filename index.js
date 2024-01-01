import fs from "fs"; // filesystem module
import path from "path"; // path module
import OpenAI from "openai"; // OpenAI SDK
import admin from "firebase-admin"; // Firebase Admin SDK
import { config } from "dotenv";
config();


// Initialize Firebase Admin SDK
const serviceAccountKeyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;


admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountKeyPath)),
  storageBucket: "chad-bot-tts-storage.appspot.com",
});

const bucket = admin.storage().bucket();

// const speechFile = path.resolve(`./audio-files/${Date()}.mp3`); // path and filename for the speech file



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

    // console.log(speechFile); // log the path where the speech file saved

    const buffer = Buffer.from(await mp3.arrayBuffer()); // convert the response to a buffer

    // Save the buffer to Firebase Storage
  const remoteFilePath = `${Date()}.mp3`;
  const file = bucket.file(remoteFilePath);

  await file.save(buffer, {
    contentType: "audio/mpeg", // Set the content type for the file
    metadata: {
      metadata: {
        customKey: "value", // Optional: You can add custom metadata to the file
      },
    },
  });

  console.log(`Audio file saved to Firebase Storage at gs://${bucket.name}/${remoteFilePath}`);


};




main();

// Usage: Please note that our Usage Policies require you to provide a clear disclosure to end users that the TTS voice they are hearing is AI-generated and not a human voice.
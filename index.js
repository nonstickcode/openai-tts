import fs from 'fs/promises'; // Import filesystem module with promises
import OpenAI from 'openai'; // OpenAI SDK
import admin from 'firebase-admin'; // Firebase Admin SDK
import { config } from 'dotenv'; // dotenv for environment variables
config(); // Load environment variables

// Initialize Firebase Admin SDK
async function initializeFirebase() {
  try {
    // Path to the Firebase service account key
    const serviceAccountKeyPath = './config/chad-bot-tts-storage-firebase-adminsdk.json';
    const serviceAccount = JSON.parse(await fs.readFile(serviceAccountKeyPath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "chad-bot-tts-storage.appspot.com",
    });
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    process.exit(1); // Exit the process if Firebase initialization fails
  }
}

// Main function to create and store TTS speech
async function main() {
  try {
    // Ensure Firebase is initialized before proceeding
    await initializeFirebase();

    // Create a new instance of the OpenAI object with your API key
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    // Create speech using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: "Hheyy, if I had a voiiice... I'd prolly say, Hey th-… thhank yoou forrr turnin onn thhhe Chadd"
    });

    // Convert the response to a buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Get Firebase bucket
    const bucket = admin.storage().bucket();

    // Save the buffer to Firebase Storage
    const remoteFilePath = `${new Date().toISOString()}.mp3`;
    const file = bucket.file(remoteFilePath);
    await file.save(buffer, {
      contentType: "audio/mpeg",
      metadata: {
        metadata: {
          customKey: "Chad Bot audio file - ChatGPT response with TTS from OpenAI", // Optional custom metadata
        },
      },
    });

    console.log(`Audio file saved to Firebase Storage at gs://${bucket.name}/${remoteFilePath}`);
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

// Run the main function
main();


// Usage: Please note that our Usage Policies require you to provide a clear disclosure to end users that the TTS voice they are hearing is AI-generated and not a human voice.
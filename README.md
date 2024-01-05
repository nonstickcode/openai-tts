# openai-tts

![Project Image](./readme-image.png)

## Overview

openai-tts is a straightforward, proof-of-concept terminal application created using Node.js. Its primary function is to explore and test the capabilities of OpenAI's new Text-to-Speech (TTS) API. This project serves as the foundational step towards integrating TTS features into larger applications, such as the Chad Bot app project.

## Features

- **Basic TTS Conversion**: Allows users to input text and receive audio output, showcasing the basic functionality of OpenAI's TTS API.
- **Audio File Storage**: Stores the created audio files in Firebase storage, providing an easy way to access and manage audio files.
- **Firebase Functions and Cloud Scheduler**: Utilizes Firebase functions triggered by a cloud scheduler to clean the audio file storage bucket daily. This ensures any audio files older than 1 week are automatically removed, preventing the bucket from getting full.
- **URL Retrieval for Audio Playback**: After storing audio files in Firebase, the app provides a URL for each file, allowing playback in the browser.
- **Node Terminal Application**: Simple and easy-to-use terminal-based application, making it accessible for quick tests and demonstrations.
- **Proof of Concept**: Demonstrates the potential and ease of integrating OpenAI's TTS API and Firebase functionalities into larger projects.

## Setup and Configuration

1. **Clone the Repository**:
   - Clone the repository and navigate to the project directory:
     ```bash
     git clone https://github.com/your-username/openai-tts.git
     cd openai-tts
     ```

2. **Environment File**:
   - Create a `.env` file in the root directory.
   - Add your OpenAI API key to the file:
     ```
     OPENAI_API_KEY=your_openai_api_key
     ```
   - Replace `your_openai_api_key` with your actual OpenAI API key.

3. **Firebase Configuration**:
   - Create a directory named `config` in the root directory.
   - Obtain the Firebase admin SDK JSON file for your Firebase storage bucket.
   - Place the `chad-bot-tts-storage-firebase-adminsdk.json` file inside the `config` directory. This file should contain the unedited JSON data from your Firebase storage bucket.

4. **Install Dependencies**:
   - Install the necessary Node.js dependencies:
     ```bash
     npm install
     ```

## How to Use

1. **Run the App**:
   - Execute the app in the terminal and follow prompts to input text.
2. **Receive Audio**:
   - Listen to the TTS conversion, and access the audio file through the provided Firebase URL.

## Future Scope

- This project is a stepping stone for more complex implementations in future applications.
- The integration of Firebase storage and cloud functions exemplifies the app's scalability and automated management capabilities.
- Feedback and insights gained from this app will guide the integration of TTS features and cloud storage functionalities in the Chad Bot app.

Thank you for exploring openai-tts. This project illuminates the path forward for incorporating advanced TTS capabilities and cloud-based storage solutions in application development.

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// eslint-disable-next-line max-len
exports.deleteOldFiles = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
  const bucket = admin.storage().bucket();
  const [files] = await bucket.getFiles();
  const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

  files.forEach(async (file) => {
    const fileCreationTime = new Date(file.metadata.timeCreated).getTime();
    if (fileCreationTime < oneWeekAgo) {
      try {
        await file.delete();
        console.log(`Deleted old file: ${file.name}`);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  });
});


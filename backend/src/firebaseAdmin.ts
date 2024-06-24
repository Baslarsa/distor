import * as admin from "firebase-admin";

import "firebase/storage";
// Import the Firebase Admin SDK

// Initialize the SDK
admin.initializeApp({
  credential: admin.credential.cert(require("../serviceAccountKey.json")),
  storageBucket: "gs://distor-d3dc1.appspot.com",
});

// Get a reference to the storage service
const bucket = admin.storage().bucket();

export { admin, bucket };

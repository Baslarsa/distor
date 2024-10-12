import * as admin from "firebase-admin";
import "firebase/storage";

// Parse the service account key from the environment variable
const serviceAccount = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "", "base64").toString(
    "utf8"
  )
);

// Initialize the Firebase Admin SDK with the parsed key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://distor-d3dc1.appspot.com",
});

// Get a reference to the storage service
const bucket = admin.storage().bucket();

export { admin, bucket };

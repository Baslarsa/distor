import multer from "multer";
import { bucket } from "../firebaseAdmin"; // Adjust the import path as necessary

// Set up memory storage
export const upload = multer({ dest: "/" }); // Adjust according to your needs

export { bucket };

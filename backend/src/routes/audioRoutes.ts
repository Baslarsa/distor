import express from "express";
import { bucket } from "../storage";
import fs from "fs";
import multer from "multer";
import { Request, Response } from "express";

const router = express.Router();

interface CustomRequest extends Request {
  file?: Express.Multer.File;
}
const upload = multer({ dest: "uploads/" });

async function uploadFile(
  file: Express.Multer.File,
  destination: string
): Promise<string> {
  try {
    const uploadedFile = await bucket.upload(file.path, {
      destination,
    });
    const fileObj = uploadedFile[0];
    await fileObj.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

    // Clean up local file
    fs.unlinkSync(file.path);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Error uploading file.");
  }
}

router.post(
  "/upload-audio",
  upload.single("audioFile"),
  async (req: CustomRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).send("Audio file is required.");
    }

    try {
      const audioDestination = `audio/${req.file.originalname}`;
      const audioPublicUrl = await uploadFile(req.file, audioDestination);

      // Create song in the database
      res.json(audioPublicUrl);
    } catch (error) {
      res.status(500).send("Error uploading audio file.");
    }
  }
);

router.post(
  "/upload-cover-art",
  upload.single("coverArt"),
  async (req: CustomRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).send("Cover art image is required.");
    }

    try {
      const coverArtDestination = `images/${req.file.originalname}`;
      const coverArtPublicUrl = await uploadFile(req.file, coverArtDestination);

      res.json(coverArtPublicUrl);
    } catch (error) {
      res.status(500).send("Error uploading cover art image.");
    }
  }
);

router.get("/stream-audio/:songUrl", async (req, res) => {
  try {
    const songUrl = req.params.songUrl;
    const file = bucket.file(songUrl);

    // Get the metadata of the file to retrieve the size
    const [metadata] = await file.getMetadata();
    const fileSize = metadata.size;

    const range = req.headers.range;
    if (!range) {
      // If no range is specified, send the entire file
      res.status(400).send("Requires Range header");
      return;
    }

    // Parse the Range header (e.g., "bytes=0-")
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : Number(fileSize) - 1;
    const chunkSize = end - start + 1;

    // Set the proper response headers
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "audio/mpeg",
    });

    // Create a readable stream for the requested chunk
    const audioStream = file.createReadStream({
      start,
      end,
    });

    // Pipe the stream to the response
    audioStream.pipe(res);

    // Handle stream errors
    audioStream.on("error", (err) => {
      console.error("Error streaming audio:", err);
      res.status(500).send("Error streaming audio.");
    });
  } catch (error) {
    console.error("Error streaming audio:", error);
    res.status(500).send("Error streaming audio.");
  }
});
export default router;

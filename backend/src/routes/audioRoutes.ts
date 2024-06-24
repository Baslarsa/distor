import express from "express";
import { prisma } from "../prisma/client";
import { upload, bucket } from "../storage";
import fs from "fs";

const router = express.Router();

router.post("/audio-upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const destination = `audio/${req.file.originalname}`;
    const uploadedFile = await bucket.upload(req.file.path, {
      destination,
    });

    const file = uploadedFile[0];
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

    fs.unlinkSync(req.file.path);
    const createSong = await prisma.song.create({
      data: {
        name: req.body.name,
        audio_src: publicUrl,
      },
    });

    res.json({
      message: "File uploaded and made public successfully.",
      url: publicUrl,
      song: createSong.name,
    });
  } catch (error) {
    console.error("Error uploading to Firebase:", error);
    res.status(500).send("Error uploading file.");
  }
});

export default router;

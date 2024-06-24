import express from "express";
import { prisma } from "../prisma/client";

const router = express.Router();

router.get("/songs", async (req, res) => {
  const songs = await prisma.song.findMany({
    include: {
      artist: true,
      genre: true,
      playlists: true,
    },
  });
  res.json({ songs: songs || undefined });
});

router.post("/song", async (req, res) => {
  const song = await prisma.song.create({
    data: {
      name: req.body.name,
    },
  });
  res.json(song);
});

export default router;

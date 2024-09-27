import express from "express";
import { prisma } from "../prisma/client";

const router = express.Router();

router.get("/playlists", async (req, res) => {
  const playlists = await prisma.playlist.findMany({
    include: {
      songs: true,
    },
  });
  res.json({ playlists: playlists || undefined });
});

router.post("/playlist", async (req, res) => {
  const playlist = await prisma.playlist.create({
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });
  res.json({ playlist });
});

router.post("/playlist-songs/:playlistId", async (req, res) => {
  const { playlistId } = req.params;
  const { songIds } = req.body;

  try {
    const playlist = await prisma.playlist.update({
      where: {
        id: playlistId,
      },
      data: {
        songs: {
          connect: songIds.map((songId: string) => ({ id: songId })),
        },
      },
    });
    res.json({ playlist });
  } catch (error) {
    console.error("Error updating playlist:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the playlist." });
  }
});

export default router;

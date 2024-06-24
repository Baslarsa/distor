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

export default router;

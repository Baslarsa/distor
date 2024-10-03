//Get artists

import express from "express";
import { prisma } from "../prisma/client";

const router = express.Router();

router.get("/artists", async (req, res) => {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        songs: true,
      },
    });
    res.json({ artists: artists || undefined });
  } catch (error) {
    console.error("Error fetching artists:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching artists." });
  }
});

router.post("/artist", async (req, res) => {
  const artist = await prisma.artist.create({
    data: {
      name: req.body.name,
    },
  });
  res.json({ artist });
});

export default router;

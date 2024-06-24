import fs from "fs";
import { prisma } from "./prisma/client";

async function generateSeed() {
  // Example: Fetch all users
  const songs = await prisma.song.findMany();
  const artists = await prisma.artist.findMany();
  const genres = await prisma.genre.findMany();
  const playlists = await prisma.playlist.findMany();

  const seedData = {
    songs,
    artists,
    genres,
    playlists,
  };

  // Write the seed data to a file
  fs.writeFileSync("prisma/seed.json", JSON.stringify(seedData, null, 2));

  console.log("Seed file generated successfully.");
}

generateSeed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

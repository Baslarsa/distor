import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import seedData from "../src/prisma/seed.json";

async function main() {
  // Create records from songs
  for (const song of seedData.songs) {
    await prisma.song.create({ data: song });
  }
  //Create records from Artists
  for (const artist of seedData.artists) {
    await prisma.artist.create({ data: artist });
  }
  //Create records from Genres
  for (const genre of seedData.genres) {
    await prisma.genre.create({ data: genre });
  }
  //Create records from Playlists
  for (const playlist of seedData.playlists) {
    await prisma.playlist.create({ data: playlist });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

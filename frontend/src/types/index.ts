import { Artist, Song } from "@prisma/client";

export type SongAndArtist = Song & { artist: Artist };

export type MenuItem = {
  name: string;
  path: string;
  icon?: string;
};

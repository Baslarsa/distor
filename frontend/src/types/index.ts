import { Artist, Playlist, Song } from "@prisma/client";

export type SongAndArtist = Song & { artist: Artist };
export type PlaylistAndSongs = Playlist & { songs: Song[] };

export type MenuItem = {
  name: string;
  path: string;
  icon?: string;
};

export type TableOption = {
  id: number;
  key: string;
  name: string;
  render: ({ songId }: { songId: string }) => JSX.Element;
};

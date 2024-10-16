import { Artist, Playlist, Song } from "@prisma/client";

export type PlaylistAndSongs = Playlist & { songs: Song[] };
export interface SongAndArtist extends Song {
  artist: Artist;
}
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

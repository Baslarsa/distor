import React, { ReactNode, createContext, useContext, useState } from "react";
import { PlaylistAndSongs, SongAndArtist } from "./types";
import { Artist, Playlist, Song } from "@prisma/client";

interface ContentContextType {
  songs: SongAndArtist[];
  artists: Artist[];
  playlists: PlaylistAndSongs[];
  setSongs: React.Dispatch<React.SetStateAction<SongAndArtist[]>>;
  setArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
  setPlaylists: React.Dispatch<React.SetStateAction<PlaylistAndSongs[]>>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContext must be used within a ContentContextProvider");
  }
  return context;
};

interface ContentContextProvierProps {
  children: ReactNode;
}

export const ContentContextProvider: React.FC<ContentContextProvierProps> = ({
  children,
}) => {
  const [songs, setSongs] = useState<SongAndArtist[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistAndSongs[]>([]);

  return (
    <ContentContext.Provider
      value={{ songs, artists, playlists, setSongs, setArtists, setPlaylists }}
    >
      {children}
    </ContentContext.Provider>
  );
};

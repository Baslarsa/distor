import React, { ReactNode, createContext, useContext, useState } from "react";
import { SongAndArtist } from "./types";

interface AudioPlayerContextType {
  currentSong: SongAndArtist | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentSong: (song: SongAndArtist) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within a AudioPlayerProvider");
  }
  return context;
};

interface AudioPlayerProviderProps {
  children: ReactNode;
}

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({
  children,
}) => {
  const [currentSong, setCurrentSong] = useState<SongAndArtist | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioPlayerContext.Provider
      value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

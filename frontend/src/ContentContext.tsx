import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { PlaylistAndSongs, SongAndArtist } from "./types";
import { Artist } from "@prisma/client";
import { getSongs } from "./network/lib/song";
import { getPlaylists } from "./network/lib/playlist";
import { getArtists } from "./network/lib/artists";
import { useError } from "./ErrorContext";
import { getBackendStatus } from "./network/lib/health";

interface ContentContextType {
  songs: SongAndArtist[];
  artists: Artist[];
  playlists: PlaylistAndSongs[];
  setSongs: React.Dispatch<React.SetStateAction<SongAndArtist[]>>;
  setArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
  setPlaylists: React.Dispatch<React.SetStateAction<PlaylistAndSongs[]>>;
  backendIsRunning: boolean;
  setBackendIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  loadingMessage: string;
  setLoadingMessage: React.Dispatch<React.SetStateAction<string>>;
  handleGetData: () => void;
  isLoadingData: boolean;
  setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [songs, setSongs] = useState<SongAndArtist[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistAndSongs[]>([]);
  const [backendIsRunning, setBackendIsRunning] = useState<boolean>(false);
  const { showError } = useError();

  const [loadingMessage, setLoadingMessage] = useState<string>("");

  const handleGetData = async () => {
    setLoadingMessage("Loading data from server...");
    const { songs } = await getSongs(showError);
    const { playlists } = await getPlaylists(showError);
    const { artists } = await getArtists(showError);

    setLoadingMessage("");
    setSongs(songs);
    setArtists(artists);
    setPlaylists(playlists);
  };

  useEffect(() => {
    const checkBackendStatus = async () => {
      if (backendIsRunning) {
        await handleGetData();
        setIsLoadingData(false);
      }
    };

    checkBackendStatus();
  }, [backendIsRunning]);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await getBackendStatus(showError);
        if (response.status === 200) {
          setBackendIsRunning(true);
          setLoadingMessage("");
        } else {
          throw new Error("Server not ready");
        }
      } catch (error) {
        setLoadingMessage("Server is starting, please wait...");
        setTimeout(checkBackendStatus, 10000); // Retry after 10 seconds
      }
    };

    checkBackendStatus();
  }, [backendIsRunning]);

  return (
    <ContentContext.Provider
      value={{
        songs,
        artists,
        playlists,
        setSongs,
        setArtists,
        setPlaylists,
        backendIsRunning,
        setBackendIsRunning,
        loadingMessage,
        setLoadingMessage,
        handleGetData,
        isLoadingData,
        setIsLoadingData,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

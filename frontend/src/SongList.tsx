import { useEffect, useState } from "react";
import "./App.css";
import { useError } from "./ErrorContext";
import { getSongs } from "./network/lib/song";
import { useAudioPlayer } from "./AudioPlayerContext";
import AudioPlayerWithWaveform from "./components/AudioPlayer";
import Layout from "./components/Layout";
import { SongAndArtist } from "./types";
import SongRow from "./components/SongRow";

function SongList() {
  const [songs, setSongs] = useState<SongAndArtist[]>();
  const { setCurrentSong } = useAudioPlayer();
  const { showError } = useError();

  const handleGetData = async () => {
    const data = await getSongs(showError);
    setSongs(data.songs);
  };

  const handleSetCurrentSong = (id: string) => {
    const song = songs?.find((s) => s.id === id);
    if (!song) return;

    setCurrentSong(song);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {songs &&
        songs.map((song) => (
          <SongRow
            key={song.id}
            song={song}
            onClick={() => handleSetCurrentSong(song.id)}
          />
        ))}
    </div>
  );
}

export default SongList;

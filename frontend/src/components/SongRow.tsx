import { Song } from "@prisma/client";
import { SongAndArtist, TableOption } from "../types";
import { HiPause, HiPlay } from "react-icons/hi";
import { useAudioPlayer } from "../AudioPlayerContext";
import { PiWaveformBold } from "react-icons/pi";
import WaveAnimation from "../assets/icons8-audio-wave.gif";
import { useContentContext } from "../ContentContext";

const SongRow = ({
  song,
  onClick,
  options,
}: {
  song: SongAndArtist;
  onClick: () => void;
  options: TableOption[];
}) => {
  const { songs } = useContentContext();
  const { setIsPlaying, isPlaying, currentSong, setCurrentSong } =
    useAudioPlayer();

  const isActive = currentSong?.id === song.id;
  const songIsPlaying = currentSong?.id === song.id && isPlaying;
  const handleSetCurrentSong = (id: string) => {
    const song = songs?.find((s) => s.id === id);
    if (!song) return;

    setCurrentSong(song);
  };

  const handleSongClick = () => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    } else {
      handleSetCurrentSong(song.id);
    }
  };

  return (
    <div
      className={`w-full items-center cursor-pointer flex justify-between py-2 px-4 ${
        isActive ? "bg-slate-100" : ""
      } hover:bg-slate-100 hover:text-black bg-transparent border-b border-b-gray-500 transition-all`}
    >
      <div className="flex gap-4 items-center" onClick={handleSongClick}>
        {songIsPlaying ? (
          <HiPause className="w-6 h-6" />
        ) : (
          <HiPlay className="w-6 h-6" />
        )}
        <div className="flex flex-col">
          <p className="flex items-center">
            {song.name}{" "}
            {songIsPlaying && <img className="h-3 mx-3" src={WaveAnimation} />}
          </p>
          {song.artist && (
            <p className="text-xs opacity-50">{song.artist.name}</p>
          )}
        </div>
      </div>
      <div>
        {options.map((option) => {
          return <option.render key={option.id} songId={song.id} />;
        })}
      </div>
    </div>
  );
};

export default SongRow;

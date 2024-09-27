import { Song } from "@prisma/client";
import { SongAndArtist, TableOption } from "../types";
import { HiPause, HiPlay } from "react-icons/hi";
import { useAudioPlayer } from "../AudioPlayerContext";
import { PiWaveformBold } from "react-icons/pi";
import WaveAnimation from "../assets/icons8-audio-wave.gif";

const SongRow = ({
  song,
  onClick,
  options,
}: {
  song: SongAndArtist;
  onClick: () => void;
  options: TableOption[];
}) => {
  const { currentSong } = useAudioPlayer();
  const { isPlaying } = useAudioPlayer();
  const isActive = currentSong?.id === song.id;
  const songIsPlaying = currentSong?.id === song.id && isPlaying;

  return (
    <div
      className={`w-full items-center cursor-pointer flex justify-between py-2 px-4 ${
        isActive ? "bg-slate-100" : ""
      } hover:bg-slate-100 bg-transparent border-b border-b-gray-100 transition-all`}
    >
      <div className="flex gap-4 items-center" onClick={onClick}>
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
          <p className="text-xs text-gray-600">{song.artist.name}</p>
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

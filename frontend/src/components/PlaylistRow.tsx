import { Playlist, Song } from "@prisma/client";
import { SongAndArtist } from "../types";

const PlaylistRow = ({
  playlist,
  songs,
}: {
  playlist: Playlist;
  songs: Song[];
}) => {
  return (
    <div
      className={`w-full items-center cursor-pointer flex justify-between py-4 px-4 hover:bg-slate-100 bg-transparent border-b border-b-gray-100 transition-all`}
    >
      <p>{playlist.name}</p>
      <p>{songs.length}</p>
    </div>
  );
};

export default PlaylistRow;

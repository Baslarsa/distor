import { Playlist, Song } from "@prisma/client";
import { SongAndArtist } from "../types";
import SongRow from "./SongRow";
import classNames from "classnames";

const PlaylistRow = ({
  playlist,
  songs,
  onOpenPlaylist,
  isOpen,
}: {
  playlist: Playlist;
  songs: SongAndArtist[] | [];
  isOpen: boolean;
  onOpenPlaylist: (id: string) => void;
}) => {
  const handleOpenPlaylist = () => {
    const content = document.getElementById(`content-${playlist.id}`);
    if (!songs) return;
    onOpenPlaylist(playlist.id);

    if (content) {
      if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    }
  };
  return (
    <div>
      <div
        onClick={handleOpenPlaylist}
        className={classNames(
          !songs.length && "cursor-default",
          isOpen && "bg-white/90 text-black",
          "w-full items-center cursor-pointer flex justify-between py-4 px-4 hover:bg-slate-100 hover:text-black bg-transparent border-b border-b-gray-500 transition-all"
        )}
      >
        <p>{playlist.name}</p>
        <p>{songs.length}</p>
      </div>
      <div
        id={`content-${playlist.id}`}
        className={classNames(
          isOpen && "bg-deepGray",
          "max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
        )}
      >
        {songs.map((song) => (
          <SongRow key={song.id} song={song} onClick={() => {}} options={[]} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistRow;

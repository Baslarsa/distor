import { Playlist } from "@prisma/client";
import PlaylistRow from "./PlaylistRow";
import { useContentContext } from "../ContentContext";
import { PlaylistAndSongs, SongAndArtist } from "../types";
import { useState } from "react";

const PlaylistList = ({ playlists }: { playlists: PlaylistAndSongs[] }) => {
  const { songs } = useContentContext();
  const [openPlaylist, setOpenPlaylist] = useState<string | null>(null);

  const handleSetPlaylist = (id: string) => {
    if (openPlaylist === id) {
      setOpenPlaylist(null);
    } else {
      setOpenPlaylist(id);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {playlists?.map((playlist) => {
        const songsInPlaylist: SongAndArtist[] = songs.filter((song) =>
          playlist.songs?.map((s) => s.id).includes(song.id)
        );
        return (
          <PlaylistRow
            key={playlist.id}
            playlist={playlist}
            songs={songsInPlaylist}
            isOpen={openPlaylist === playlist.id}
            onOpenPlaylist={handleSetPlaylist}
          />
        );
      })}
    </div>
  );
};

export default PlaylistList;

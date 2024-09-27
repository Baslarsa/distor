import { Playlist } from "@prisma/client";
import PlaylistRow from "./PlaylistRow";
import { useContentContext } from "../ContentContext";
import { PlaylistAndSongs } from "../types";

const PlaylistList = ({ playlists }: { playlists: PlaylistAndSongs[] }) => {
  const { songs } = useContentContext();

  return (
    <div className="flex flex-col w-full">
      {playlists.map((playlist) => {
        const songsInPlaylist = playlist.songs;
        return (
          <PlaylistRow
            key={playlist.id}
            playlist={playlist}
            songs={songsInPlaylist}
          />
        );
      })}
    </div>
  );
};

export default PlaylistList;

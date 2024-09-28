import { useAudioPlayer } from "../AudioPlayerContext";
import AddToPlaylistModalButton from "./AddToPlaylistModalButton";
import SongRow from "./SongRow";
import { useError } from "../ErrorContext";
import { SongAndArtist, TableOption } from "../types";

function SongList({ songs }: { songs: SongAndArtist[] }) {
  const options: TableOption[] = [
    {
      id: 1,
      key: "add-to-playlist",
      name: "Add to Playlist",
      render: AddToPlaylistModalButton,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {songs &&
        songs.map((song) => (
          <SongRow
            key={song.id}
            song={song}
            onClick={() => {}}
            options={options}
          />
        ))}
    </div>
  );
}

export default SongList;

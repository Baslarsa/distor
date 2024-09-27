import { useAudioPlayer } from "../AudioPlayerContext";
import AddToPlaylistModalButton from "./AddToPlaylistModalButton";
import SongRow from "./SongRow";
import { useError } from "../ErrorContext";
import { SongAndArtist, TableOption } from "../types";

function SongList({ songs }: { songs: SongAndArtist[] }) {
  const { showError } = useError();
  const { setIsPlaying, isPlaying, currentSong, setCurrentSong } =
    useAudioPlayer();
  console.log(isPlaying, currentSong);
  const handleSetCurrentSong = (id: string) => {
    const song = songs?.find((s) => s.id === id);
    if (!song) return;

    setCurrentSong(song);
  };

  const handleSongClick = (songId: string) => {
    if (currentSong?.id === songId) {
      if (isPlaying) {
        console.log("ITs playing this song");
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    } else {
      handleSetCurrentSong(songId);
    }
  };

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
            onClick={() => handleSongClick(song.id)}
            options={options}
          />
        ))}
    </div>
  );
}

export default SongList;

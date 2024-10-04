import CreatePlaylistModal from "../components/CreatePlaylistModal";
import PageTitle from "../components/PageTitle";
import PlaylistList from "../components/PlaylistList";
import { useContentContext } from "../ContentContext";

const Playlists = () => {
  const { playlists } = useContentContext();

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 items-center justify-between">
        <PageTitle title="Playlists" />
        <CreatePlaylistModal />
      </div>
      <PlaylistList playlists={playlists} />
    </div>
  );
};

export default Playlists;

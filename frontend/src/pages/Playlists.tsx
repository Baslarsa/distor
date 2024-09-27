import PageTitle from "../components/PageTitle";
import PlaylistList from "../components/PlaylistList";
import { useContentContext } from "../ContentContext";

const Playlists = () => {
  const { playlists } = useContentContext();

  return (
    <div className="flex flex-col w-full">
      <PageTitle title="Playlists" />
      <PlaylistList playlists={playlists} />
    </div>
  );
};

export default Playlists;

import PageTitle from "../components/PageTitle";
import SongList from "../components/SongList";
import { useContentContext } from "../ContentContext";

const Songs = () => {
  const { songs } = useContentContext();

  return (
    <div className="flex flex-col w-full">
      <PageTitle title="Songs" />
      <SongList songs={songs} />
    </div>
  );
};

export default Songs;

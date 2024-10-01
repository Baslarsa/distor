import PageTitle from "../components/PageTitle";
import SongList from "../components/SongList";
import DefaultButton from "../components/ui-components/DefaultButton";
import { useContentContext } from "../ContentContext";

const Songs = () => {
  const { songs } = useContentContext();

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 items-center">
        <PageTitle title="Songs" />
      </div>
      <SongList songs={songs} />
    </div>
  );
};

export default Songs;

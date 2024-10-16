import ArtistsList from "../components/ArtistsList";
import PageTitle from "../components/PageTitle";
import { useContentContext } from "../ContentContext";

const Artists = () => {
  const { artists } = useContentContext();
  return (
    <div className="w-full pb-36">
      <PageTitle title="Your artists" />
      <ArtistsList artists={artists} />
    </div>
  );
};

export default Artists;

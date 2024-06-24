import { useEffect, useState } from "react";
import SongList from "../SongList";
import { SongAndArtist } from "../types";
import { getSongs } from "../network/lib/song";
import { useError } from "../ErrorContext";
import PageTitle from "../components/PageTitle";

const DiscoverPage = () => {
  const [songs, setSongs] = useState<SongAndArtist[]>([]);
  const { showError } = useError();

  const handleGetData = async () => {
    const data = await getSongs(showError);
    setSongs(data.songs);
  };
  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <div>
      <PageTitle title="Discover Music" />
      <SongList songs={songs} />
    </div>
  );
};

export default DiscoverPage;

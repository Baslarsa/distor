import { useEffect, useState } from "react";
import SongList from "../components/SongList";
import { SongAndArtist } from "../types";
import { getSongs } from "../network/lib/song";
import { useError } from "../ErrorContext";
import PageTitle from "../components/PageTitle";
import { useContentContext } from "../ContentContext";

const DiscoverPage = () => {
  const { songs } = useContentContext();

  return (
    <div className="flex flex-col w-full">
      <PageTitle title="Discover Music" />
      <SongList songs={songs} />
    </div>
  );
};

export default DiscoverPage;

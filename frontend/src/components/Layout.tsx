import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AudioPlayerWithWaveform from "./AudioPlayer";
import { useEffect } from "react";
import { useContentContext } from "../ContentContext";
import { getSongs } from "../network/lib/song";
import { useError } from "../ErrorContext";
import { getPlaylists } from "../network/lib/playlist";
import { getArtists } from "../network/lib/artists";

const Layout = () => {
  const { showError } = useError();
  const { setSongs, setArtists, setPlaylists } = useContentContext();

  const handleGetData = async () => {
    const { songs } = await getSongs(showError);
    const { playlists } = await getPlaylists(showError);
    const { artists } = await getArtists(showError);
    setSongs(songs);
    setArtists(artists);
    setPlaylists(playlists);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="flex h-full max-h-screen relative overflow-hidden">
      <Sidebar />
      <div className="w-full flex p-4 h-full overflow-y-scroll max-h-screen">
        <div className="max-w-7xl w-full mx-auto p-4 flex">
          <Outlet />
        </div>
      </div>
      <AudioPlayerWithWaveform />
    </div>
  );
};

export default Layout;

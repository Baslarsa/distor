import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AudioPlayerWithWaveform from "./AudioPlayer";

const Layout = () => {
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

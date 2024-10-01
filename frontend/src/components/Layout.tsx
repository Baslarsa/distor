import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AudioPlayerWithWaveform from "./AudioPlayer";
import { useContentContext } from "../ContentContext";
import { TrophySpin } from "react-loading-indicators";
import { Fade } from "react-awesome-reveal";

const Layout = () => {
  const { backendIsRunning, loadingMessage } = useContentContext();
  return (
    <Fade>
      {backendIsRunning ? (
        <div className="flex h-full max-h-screen relative overflow-hidden bg-offBlack text-white">
          <Sidebar />
          <div className="w-full flex p-4 h-full overflow-y-scroll max-h-screen">
            <div className="max-w-7xl w-full mx-auto p-4 flex">
              <Outlet />
            </div>
          </div>
          <AudioPlayerWithWaveform />
        </div>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center bg-black">
          <TrophySpin
            color={["#FFFFFF", "#cccccc"]}
            size="medium"
            text={loadingMessage}
            textColor="white"
          />
        </div>
      )}
    </Fade>
  );
};

export default Layout;

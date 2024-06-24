import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import SongList from "../SongList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <SongList /> },
      { path: "artists", element: <div>Artists</div> },
      { path: "songs", element: <div>Songs</div> },
      { path: "playlists", element: <div>Playlists</div> },
    ],
  },
]);

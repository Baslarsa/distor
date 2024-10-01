import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import DiscoverPage from "../pages/Discover";
import Artists from "../pages/Artists";
import Songs from "../pages/Songs";
import Playlists from "../pages/Playlists";
import CreateRelease from "../pages/CreateRelease";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <DiscoverPage /> },
      { path: "artists", element: <Artists /> },
      { path: "songs", element: <Songs /> },
      { path: "playlists", element: <Playlists /> },
      { path: "create-release", element: <CreateRelease /> },
    ],
  },
]);

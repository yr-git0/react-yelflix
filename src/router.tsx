import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { Home, ComingSoon, NowPlaying } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
      },
    ],
  },
]);

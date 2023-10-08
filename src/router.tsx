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
        path: "popular/movies/:id",
        element: <Home />,
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
        children: [
          {
            path: "movies/:id",
            element: <ComingSoon />,
          },
        ],
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
        children: [
          {
            path: "movies/:id",
            element: <NowPlaying />,
          },
        ],
      },
    ],
  },
]);

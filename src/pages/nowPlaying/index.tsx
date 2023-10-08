import { useQuery } from "@tanstack/react-query";
import { getNowPlaying, IAPIResponse } from "../../api";
import Loader from "../../components/Loader";
import MovieList from "../../components/MovieList";

function NowPlaying() {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "nowplaying"],
    getNowPlaying
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <MovieList category="now-playing" data={data} />
      )}
    </>
  );
}

export default NowPlaying;

import { useQuery } from "@tanstack/react-query";
import { getComingSoon, IAPIResponse } from "../../api";
import Loader from "../../components/Loader";
import MovieList from "../../components/MovieList";

function ComingSoon() {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "comingsoon"],
    getComingSoon
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <MovieList category="coming-soon" data={data} />
      )}
    </>
  );
}

export default ComingSoon;

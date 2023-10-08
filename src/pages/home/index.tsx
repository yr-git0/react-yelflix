import { useQuery } from "@tanstack/react-query";
import { getPopular, IAPIResponse } from "../../api";
import Loader from "../../components/Loader";
import MovieList from "../../components/MovieList";

function Home() {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "popular"],
    getPopular
  );

  return (
    <>{isLoading ? <Loader /> : <MovieList category="popular" data={data} />}</>
  );
}

export default Home;

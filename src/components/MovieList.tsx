import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { IAPIResponse, makeImagePath } from "../api";
import MoviePop from "./MoviePop";

const MovieGrid = styled(motion.ul)`
  min-width: 700px;
  max-width: 1270px;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
  gap: 30px 20px;
  margin-bottom: 150px;
`;

const MovieCard = styled(motion.div)`
  width: 200px;
  height: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;

const Thumbnail = styled(motion.img)`
  width: 100%;
  height: 260px;
  border-radius: 15px;
  margin-bottom: 15px;
  object-fit: cover;
  box-shadow: 3px 3px 7px rgba(255, 255, 255, 0.2);
`;

const Title = styled(motion.p)`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const gridVariants = {
  initial: {
    scale: 1,
  },
  visible: {
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.5,
    },
  },
  hover: {
    scale: 2,
    y: -10,
  },
};

interface IMovieListProps {
  category: string;
  data: IAPIResponse | undefined;
}

function MovieList({ category, data }: IMovieListProps) {
  const moviePopMatch = useMatch(`${category}/movies/:id`);
  const navigate = useNavigate();
  const onMovieClick = (movieId: number) => {
    navigate(`/${category}/movies/${movieId}`);
  };

  return (
    <>
      <MovieGrid variants={gridVariants} initial="initial" animate="visible">
        {data?.results.map((movie) => (
          <MovieCard
            key={movie.id}
            layoutId={category + movie.id}
            onClick={() => onMovieClick(movie.id)}
            variants={cardVariants}
            whileHover={{ scale: 1.1, y: -10 }}
            whileTap={{ scale: 0.95 }}
          >
            <Thumbnail src={makeImagePath(movie.poster_path)} />
            <Title>{movie.title}</Title>
          </MovieCard>
        ))}
      </MovieGrid>
      <AnimatePresence>
        {moviePopMatch && moviePopMatch.params.id !== undefined ? (
          <MoviePop category={category} movieId={moviePopMatch.params.id} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default MovieList;

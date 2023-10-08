import { styled } from "styled-components";
import { getPopular, IAPIResponse, makeImagePath } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieGrid = styled(motion.div)`
  width: 870px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px 15px;
  align-items: top;
  grid-auto-rows: auto;
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
  box-shadow: 2px 2px 2px rgba(255, 255, 255, 0.2);
`;

const Title = styled(motion.p)`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const gridVariants = {
  hidden: {
    scale: 1,
  },
  show: {
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  hover: {},
};

const cardVariants = {
  hidden: {
    scale: 0,
  },
  show: {
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.1,
    y: -10,
    transition: {
      delay: 0.2,
      duaration: 0.1,
      // type: "tween",
    },
  },
};

function Home() {
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "popular"],
    getPopular
  );
  console.log(data);

  return (
    <>
      {isLoading ? (
        <Loader>Loading....</Loader>
      ) : (
        <MovieGrid variants={gridVariants} initial="hidden" animate="show">
          {data?.results.map((movie) => (
            <MovieCard
              key={movie.id}
              variants={cardVariants}
              // initial="initial"
              // animate="show"
              whileHover={{ scale: 1.2 }}
            >
              <Thumbnail src={makeImagePath(movie.poster_path)} />
              <Title>{movie.title}</Title>
            </MovieCard>
          ))}
        </MovieGrid>
      )}
    </>
  );
}

export default Home;

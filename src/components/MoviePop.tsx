import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovieDetail, getMovie, makeBgPath } from "../api";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Popup = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 600px;
  height: 900px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #171617;
  left: 0;
  right: 0;
  margin: auto auto;
`;

const CloseButton = styled(motion.svg)`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  opacity: 0.8;
  cursor: pointer;
`;

const BgImage = styled.div`
  width: 100%;
  height: 50%;
  background-size: cover;
  background-position: center center;
`;

const DetailInfo = styled.div`
  position: relative;
  top: -70px;
  height: 55%;
  padding: 0 30px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    padding: 5px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0);
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#f64435, #ffe498);
    border-radius: 25px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
  }
`;

const Title = styled.p`
  font-size: 50px;
  font-weight: bold;
`;

const Overview = styled.p`
  font-size: 17px;
`;

const EtcInfo = styled.p`
  font-size: 15px;
  line-height: 25px;
  white-space: pre-line;
`;

const Genres = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const Genre = styled.div`
  width: fit-content;
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
`;

const closeVariants = {
  hover: {
    scale: 1.1,
  },
};

const popupVariants = {
  exit: {
    scale: 0,
    transition: {
      delay: 0.2,
    },
  },
};

interface IMoviePop {
  category: string;
  movieId: string;
}

function MoviePop({ category, movieId }: IMoviePop) {
  const { data, isLoading } = useQuery<IMovieDetail>(["moviedetail"], () =>
    getMovie(movieId)
  );
  const navigate = useNavigate();
  const onCloseMoviePop = () => {
    navigate(-1);
  };
  console.log(data);
  return (
    <>
      <Overlay exit={{ opacity: 0 }} />
      {isLoading ? null : (
        <Popup
          layoutId={category + movieId}
          variants={popupVariants}
          exit="exit"
        >
          <CloseButton
            onClick={onCloseMoviePop}
            variants={closeVariants}
            whileHover="hover"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            ></path>
          </CloseButton>
          {data?.backdrop_path !== undefined ? (
            <BgImage
              style={{
                backgroundImage: `linear-gradient(to top, #171617, transparent), url(${makeBgPath(
                  data.backdrop_path
                )})`,
              }}
            />
          ) : null}
          <DetailInfo>
            <Title>{data?.title}</Title>
            <Overview>{data?.overview}</Overview>
            <EtcInfo>
              {data?.release_date
                ? `🔸 Release : ${data.release_date}\n`
                : null}
              {data?.runtime ? `🔸 Runtime : ${data.runtime} minutes\n` : null}
              {data?.budget
                ? `🔸 Budget : $${data.budget.toLocaleString("en-US")}\n`
                : null}

              {data?.revenue
                ? `🔸 Revenue : $${data.revenue.toLocaleString("en-US")}\n`
                : null}
              {data?.homepage ? `🔸 Homepage : ${data.homepage}\n` : null}
            </EtcInfo>
            <Genres>
              {data?.genres.map((genre) => (
                <Genre>{genre.name}</Genre>
              ))}
            </Genres>
          </DetailInfo>
        </Popup>
      )}
    </>
  );
}

export default MoviePop;

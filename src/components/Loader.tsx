import { styled } from "styled-components";

const LoaderDiv = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loader() {
  return <LoaderDiv>Loading...</LoaderDiv>;
}

export default Loader;

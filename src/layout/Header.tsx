import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { styled } from "styled-components";

const Logo = styled(motion.img)`
  width: 200px;
  height: auto;
  margin-bottom: 5px;
`;

const Navigation = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
  padding-bottom: 40px;
  color: white;
`;

const Items = styled(motion.ul)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
`;

const Item = styled(motion.li)`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: rgba(108, 102, 102);
  }
`;

const ItemCircle = styled(motion.span)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgb(201, 54, 53);
`;

function Header() {
  const homeMatch = useMatch("/");
  const popularMatch = useMatch("popular/*");
  const comingSoonMatch = useMatch("coming-soon/*");
  const nowPlayingMatch = useMatch("now-playing/*");

  return (
    <Navigation>
      <Logo src={require("../images/YELFLIX.png")} />
      <Items>
        <Item>
          <Link to="/">POPULAR</Link>
          {(homeMatch || popularMatch) && <ItemCircle layoutId="itemCircle" />}
        </Item>
        <Item>
          <Link to="coming-soon">COMING SOON</Link>
          {comingSoonMatch && <ItemCircle layoutId="itemCircle" />}
        </Item>
        <Item>
          <Link to="now-playing">NOW PLAYING</Link>
          {nowPlayingMatch && <ItemCircle layoutId="itemCircle" />}
        </Item>
      </Items>
    </Navigation>
  );
}

export default Header;

import styled from "styled-components";
import { Button } from "../button/button";
import { Marginer } from "../marginer/marginer";
import { Link } from "react-router-dom";

const NavbarContainer = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 30px;
`;

const NavbarLinksContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarLinks = styled.a`
  font-family: Oswald;
  font-style: normal;
  // font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #333333;
  text-decoration: none;
  outline: none;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    color: #fd35bd;
  }
`;

export function Navbar(props) {
  return (
    <NavbarContainer>
      <NavbarLinksContainer>
        {/* <NavbarLinks>ABOUT</NavbarLinks>
        <Marginer direction="horizontal" margin={25} />
        <NavbarLinks>WHO ARE WE</NavbarLinks>
        <Marginer direction="horizontal" margin={25} /> */}
        <Link to="/signup">
          <Button size={18}>SIGN UP</Button>
        </Link>
      </NavbarLinksContainer>
    </NavbarContainer>
  );
}

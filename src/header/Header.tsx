import styled from "styled-components/macro";
import Menu from "./Menu";

const Header = () => {
  return (
    <HeaderContainer>
      <HoverDiv>
        <h1 onClick={() => window.location.replace("/")}>Bekk Gokart</h1>
      </HoverDiv>
      <Menu />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  margin: 0 7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767px) {
    margin: 0 3rem;
  }
`;

const HoverDiv = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export default Header;

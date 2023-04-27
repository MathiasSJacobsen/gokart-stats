import styled from "styled-components/macro";
import Menu from "./Menu";

const Header = () => {
  return (
    <HeaderContainer>
      <HoverDiv>
        <h1 onClick={() => window.location.replace("/")}>Bekk Gokart</h1>
      </HoverDiv>
      <MyDiv>
        <HoverDiv>
          <h4 onClick={() => window.location.replace("/session/1")}>S1</h4>
        </HoverDiv>
        <HoverDiv>
          <h4 onClick={() => window.location.replace("/session/2")}>S2</h4>
        </HoverDiv>
      </MyDiv>
      <Menu />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const MyDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 15%;
`;

const HoverDiv = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export default Header;

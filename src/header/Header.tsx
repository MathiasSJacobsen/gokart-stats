import styled from "styled-components/macro";
import Menu from "./Menu";

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Bekk Gokart</h1>
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
export default Header;

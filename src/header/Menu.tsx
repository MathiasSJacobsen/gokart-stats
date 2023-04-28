import React, { useState } from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const MenuButton = styled.button`
  cursor: pointer;
`;

const MenuList = styled.ul`
  position: absolute;
  width: 7rem;
  top: 100%;
  left: 0;
  background-color: white;
  padding: 0.5rem;
  border: 1px solid black;
  list-style: none;
  margin: 0;
  z-index: 2;
`;

const MenuItem = styled.li`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MenuLink = styled.a`
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContainer>
      <MenuButton onClick={handleMenuClick}>🍔</MenuButton>
      {isOpen && (
        <MenuList>
          <MenuItem>
            <MenuLink href="/">Home</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/info">Info</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/session/1">Session 1</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/session/2">Session 2</MenuLink>
          </MenuItem>
        </MenuList>
      )}
    </MenuContainer>
  );
};

export default Menu;

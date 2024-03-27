import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { showHeaderMenuSelector } from "../store/reducers/showConnectSlice";
import { p_14_medium } from "../styles/textStyles";
import { ReactComponent as Plus } from "../public/imgs/icons/grey-plus.svg";
import { ReactComponent as Discussions } from "../public/imgs/icons/grey-discussions.svg";

const MenuWrapper = styled.div`
  cursor: auto;
  min-width: 240px;
  position: absolute;
  right: 0;
  top: 100%;
  background: var(--fillBgPrimary);
  border: 1px solid var(--strokeBorderDefault);
  box-shadow: var(--shadowCardHover);
  padding: 20px;
  padding-bottom: 8px;
  z-index: 1;
  @media screen and (max-width: 800px) {
    margin-top: 19px;
    border: none;
    box-shadow: none;
    width: 100%;
    position: initial;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const MenuItem = styled.div`
  margin-bottom: 8px;
  cursor: pointer;
`;

const ItemWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${p_14_medium};
  color: var(--textSecondary);

  :hover {
    color: var(--textPrimary);
  }
`;

function Menu() {
  const showMenu = useSelector(showHeaderMenuSelector);
  if (showMenu) {
    return (
      <MenuWrapper onClick={(e) => e.stopPropagation()}>
        <MenuItem>
          <ItemWrapper
            target="_blank"
            href="https://github.com/opensquare-network/collaboration/discussions/813"
          >
            <span>Add a Space</span>
            <Plus />
          </ItemWrapper>
        </MenuItem>
        <MenuItem>
          <ItemWrapper
            target="_blank"
            href="https://github.com/opensquare-network/collaboration/discussions"
          >
            <span>Discussions</span>
            <Discussions />
          </ItemWrapper>
        </MenuItem>
      </MenuWrapper>
    );
  }
  return null;
}

export default Menu;

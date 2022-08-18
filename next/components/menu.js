import React from "react";
import styled from "styled-components";
import { shadow_200 } from "../styles/globalCss";
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
  background: #ffffff;
  border: 1px solid #f0f3f8;
  ${shadow_200};
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
    border-bottom: 20px solid white;
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
  color: #506176;

  :hover {
    color: #1e2134;
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

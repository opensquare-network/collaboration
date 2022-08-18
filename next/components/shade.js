import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { showHeaderMenuSelector } from "../store/reducers/showConnectSlice";

const Shade = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    display: initial;
    position: fixed;
    background: rgba(0, 0, 0, 0.15);
    transform: matrix(1, 0, 0, -1, 0, 0);
    width: 100%;
    height: 100%;
    top: 158px;
    left: 0;
    right: 0;
  }
`;

export default function ShadeLayer() {
  const showMenu = useSelector(showHeaderMenuSelector);
  if (showMenu) {
    return <Shade />;
  }
  return null;
}

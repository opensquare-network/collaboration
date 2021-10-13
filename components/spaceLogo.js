import styled from "styled-components";
import { makeSquare } from "../styles/globalCss";

const LogoImg = styled.img`
  ${makeSquare(64)};
  border: 1px solid #ddd;
  border-radius: 32px;
  margin-right: 24px;
`;

export default function SpaceLogo({src}){
  return <LogoImg src={src} alt=""/>
}

import styled from "styled-components";
import { makeSquare } from "../styles/globalCss";

const LogoImg = styled.img`
  ${makeSquare(64)};
  border: 1px solid #e2e8f0;
  border-radius: 32px;
  margin-right: 24px;
`;

export default function SpaceLogo({ space }) {
  return <LogoImg src={`/imgs/icons/space/${space.spaceIcon}`} alt="" />;
}

import styled from "styled-components";
import { makeSquare } from "../styles/globalCss";
import getSpaceConfigs from "../frontedUtils/consts/spaces";

const LogoImg = styled.img`
  ${makeSquare(64)};
  border: 1px solid #e2e8f0;
  border-radius: 32px;
  margin-right: 24px;
`;

export default function SpaceLogo({ spaceId }) {
  const config = getSpaceConfigs(spaceId);
  return <LogoImg src={`/imgs/icons/space/${config.spaceIcon}`} alt="" />;
}

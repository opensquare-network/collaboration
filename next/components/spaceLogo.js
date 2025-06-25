import styled from "styled-components";
import { makeSquare } from "../styles/globalCss";
import { useSpaceIconUri } from "frontedUtils/space";

const LogoImg = styled.img`
  ${makeSquare(64)};
  border: 1px solid var(--strokeActionDefault);
  border-radius: 32px;
  margin-right: 24px;
`;

export default function SpaceLogo({ space }) {
  const spaceIcon = useSpaceIconUri(space);
  return <LogoImg src={spaceIcon} alt="" />;
}

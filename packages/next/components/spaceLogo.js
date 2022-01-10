import styled from "styled-components";
import { makeSquare } from "../styles/globalCss";

const LogoImg = styled.img`
  ${makeSquare(64)};
  border: 1px solid #E2E8F0;
  border-radius: 32px;
  margin-right: 24px;
`;

const SpaceIcons = {
  polkadot: "polkadot.svg",
  kusama: "kusama.svg",
  karura: "karura.svg",
  khala: "khala.svg",
  rmrk: "rmrk.svg",
};

export default function SpaceLogo({ spaceId }){
  const spaceIcon = SpaceIcons[spaceId] || "space-noicon.svg";
  return <LogoImg src={`/imgs/icons/${spaceIcon}`} alt=""/>
}

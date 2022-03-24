import styled from "styled-components";
import { makeSquare } from "../styles/globalCss";

const LogoImg = styled.img`
  ${makeSquare(64)};
  border: 1px solid #e2e8f0;
  border-radius: 32px;
  margin-right: 24px;
`;

const SpaceIcons = {
  polkadot: "polkadot.svg",
  kusama: "kusama.svg",
  karura: "karura.svg",
  khala: "khala.svg",
  rmrk: "rmrk.svg",
  "rmrk-curation": "rmrk-curation.png",
  bifrost: "bifrost.svg",
  kintsugi: "kintsugi.svg",
  polarisdao: "polarisdao.png",
  polkadex: "polkadex.svg",
  chrwna: "chrwna.svg",
  interlay: "interlay.svg",
};

export default function SpaceLogo({ spaceId }) {
  const spaceIcon = SpaceIcons[spaceId] || "space-noicon.svg";
  return <LogoImg src={`/imgs/icons/space/${spaceIcon}`} alt="" />;
}

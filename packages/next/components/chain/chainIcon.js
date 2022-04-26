import { ReactComponent as Statemine } from "public/imgs/icons/chain/statemine.svg";
import { ReactComponent as Polkadot } from "public/imgs/icons/chain/polkadot.svg";
import { ReactComponent as Khala } from "public/imgs/icons/chain/khala.svg";
import { ReactComponent as Kusama } from "public/imgs/icons/chain/kusama.svg";
import { ReactComponent as Kintsugi } from "public/imgs/icons/chain/kintsugi.svg";
import { ReactComponent as Default } from "public/imgs/icons/chain/default.svg";
import { ReactComponent as Moonriver } from "public/imgs/icons/chain/moonriver.svg";
import { ReactComponent as Polkadex } from "public/imgs/icons/chain/polkadex.svg";
import { ReactComponent as Interlay } from "public/imgs/icons/chain/interlay.svg";
import { ReactComponent as Crust } from "public/imgs/icons/chain/crust.svg";
import { CHAINS } from "../../frontedUtils/consts/chains";
import styled from "styled-components";
import Tooltip from "../tooltip";
import { capitalize } from "frontedUtils";

const Wrapper = styled.span`
  position: relative;
  display: flex;
`;

function resolveChainIcon({ chainName, size = 24 }) {
  switch (chainName) {
    case "polkadot":
      return <Polkadot viewBox="0 0 24 24" width={size} height={size} />;
    case "kusama":
      return <Kusama viewBox="0 0 24 24" width={size} height={size} />;
    case "statemine":
      return <Statemine viewBox="0 0 24 24" width={size} height={size} />;
    case "karura":
      return <img src="/imgs/icons/chain/karura.svg" width={size} alt="" />;
    case "khala":
      return <Khala viewBox="0 0 24 24" width={size} height={size} />;
    case "bifrost":
      return <img src="/imgs/icons/chain/bifrost.svg" width={size} alt="" />;
    case "kintsugi":
      return <Kintsugi viewBox="0 0 24 24" width={size} height={size} />;
    case "moonriver":
      return <Moonriver viewBox="0 0 24 24" width={size} height={size} />;
    case "interlay":
      return <Interlay viewBox="0 0 24 24" width={size} height={size} />;
    case CHAINS.acala:
      return <img src="/imgs/icons/chain/acala.svg" width={size} alt="" />;
    case CHAINS.polkadex:
      return <Polkadex viewBox="0 0 24 24" width={size} height={size} />;
    case CHAINS.crust:
      return <Crust viewBox="0 0 24 24" width={size} height={size} />;
    default:
      return <Default viewBox="0 0 24 24" width={size} height={size} />;
  }
}

function ChainIcon({
  chainName,
  position,
  offset,
  showTooltip = false,
  size = 24,
}) {
  const Icon = resolveChainIcon({ chainName, size });

  return (
    <Wrapper>
      {Icon}
      {showTooltip && (
        <Tooltip
          content={capitalize(chainName)}
          position={position}
          offset={offset}
          size="full"
        >
          <></>
        </Tooltip>
      )}
    </Wrapper>
  );
}

export default ChainIcon;

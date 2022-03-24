import Statemine from "public/imgs/icons/chain/statemine.svg";
import Polkadot from "public/imgs/icons/chain/polkadot.svg";
import Khala from "public/imgs/icons/chain/khala.svg";
import Kusama from "public/imgs/icons/chain/kusama.svg";
import Kintsugi from "public/imgs/icons/chain/kintsugi.svg";
import Default from "public/imgs/icons/chain/default.svg";
import Moonriver from "public/imgs/icons/chain/moonriver.svg";
import Polkadex from "public/imgs/icons/chain/polkadex.svg";
import Interlay from "public/imgs/icons/chain/interlay.svg";
import { CHAINS } from "../../frontedUtils/consts/chains";

function ChainIcon({ chainName, size = 24 }) {
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
    case CHAINS.polkadex:
      return <Polkadex viewBox="0 0 24 24" width={size} height={size} />;
    default:
      return <Default viewBox="0 0 24 24" width={size} height={size} />;
  }
}

export default ChainIcon;

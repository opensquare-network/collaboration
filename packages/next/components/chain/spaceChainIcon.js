import Bifrost from "public/imgs/icons/space-chain/bifrost.svg";
import Polkadot from "public/imgs/icons/space-chain/polkadot.svg";
import Karura from "public/imgs/icons/space-chain/karura.svg";
import Khala from "public/imgs/icons/space-chain/khala.svg";
import Kusama from "public/imgs/icons/space-chain/kusama.svg";
import Statemine from "public/imgs/icons/space-chain/statemine.svg";
import Moonriver from "public/imgs/icons/space-chain/moonriver.svg";
import Kintsugi from "public/imgs/icons/space-chain/kintsugi.svg";
import Default from "public/imgs/icons/space-chain/default.svg";

function SpaceChainIcon({ chainName }) {
  switch (chainName) {
    case "polkadot":
      return <Polkadot />;
    case "kusama":
      return <Kusama />;
    case "statemine":
      return <Statemine />;
    case "karura":
      return <Karura />;
    case "khala":
      return <Khala />;
    case "bifrost":
      return <Bifrost />;
    case "kintsugi":
      return <Kintsugi />;
    case "moonriver":
      return <Moonriver />;
    default:
      return <Default />;
  }
}

export default SpaceChainIcon;

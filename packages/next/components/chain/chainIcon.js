import Statemine from "public/imgs/icons/chain/statemine.svg";
import Bifrost from "public/imgs/icons/chain/bifrost.svg";
import Polkadot from "public/imgs/icons/chain/polkadot.svg";
import Karura from "public/imgs/icons/chain/karura.svg";
import Khala from "public/imgs/icons/chain/khala.svg";
import Kusama from "public/imgs/icons/chain/kusama.svg";
import Kintsugi from "public/imgs/logos/kintsugi.svg";
import Default from "public/imgs/icons/chain/default.svg";
import Moonriver from "public/imgs/icons/chain/moonriver.svg";

function ChainIcon({ chainName }) {
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

export default ChainIcon;

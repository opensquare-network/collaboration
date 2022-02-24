import Bifrost from "public/imgs/icons/chain/bifrost.svg";
import Polkadot from "public/imgs/icons/chain/polkadot.svg";
import Karura from "public/imgs/icons/chain/karura.svg";
import Khala from "public/imgs/icons/chain/khala.svg";
import Default from "public/imgs/icons/chain/default.svg";

function ChainIcon({ chainName }) {
  if (chainName === "bifrost") {
    return <Bifrost />;
  }
  if (chainName === "polkadot") {
    return <Polkadot />;
  }
  if (chainName === "karura") {
    return <Karura />;
  }
  if (chainName === "khala") {
    return <Khala />;
  }
  return <Default />;
}

export default ChainIcon;

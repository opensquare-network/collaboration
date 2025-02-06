import camalCase from "lodash.camelcase";
import { ChainIcon as _ChainIcon, Tooltip } from "@osn/common-ui";
import { getChainDisplayName, normalizeChainName } from "frontedUtils/chain";
import { networks } from "frontedUtils/consts/chains/networks";

export function ChainIcon({ chainName, size }) {
  let chain = camalCase(normalizeChainName(chainName));
  if (chainName === networks.creditcoinNative) {
    chain = networks.creditcoin;
  }

  return (
    <Tooltip content={getChainDisplayName(chainName)}>
      <div>
        <_ChainIcon chainName={chain} size={size} />
      </div>
    </Tooltip>
  );
}

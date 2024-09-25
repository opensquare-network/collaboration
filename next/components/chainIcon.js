import camalCase from "lodash.camelcase";
import { ChainIcon as _ChainIcon, Tooltip } from "@osn/common-ui";
import { networks } from "frontedUtils/consts/chains/networks";
import { normalizeChainName } from "frontedUtils/chain";

function getIconChainName(chainName) {
  if (networks.bifrost === chainName) {
    return networks.bifrostKusama;
  }
  return chainName;
}

export function ChainIcon({ chainName, size }) {
  return (
    <Tooltip content={normalizeChainName(chainName)}>
      <div>
        <_ChainIcon
          chainName={camalCase(getIconChainName(chainName))}
          size={size}
        />
      </div>
    </Tooltip>
  );
}

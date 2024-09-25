import camalCase from "lodash.camelcase";
import { ChainIcon as _ChainIcon, Tooltip } from "@osn/common-ui";
import { networks } from "frontedUtils/consts/chains/networks";

export function ChainIcon({ chainName, size }) {
  const normalizedChain =
    chainName === networks.bifrost ? networks.bifrostKusama : chainName;

  let iconChainName = normalizedChain;
  if (
    [networks.bifrostPolkadot, networks.bifrostKusama].includes(normalizedChain)
  ) {
    iconChainName = networks.bifrost;
  }

  return (
    <Tooltip content={normalizedChain}>
      <div>
        <_ChainIcon chainName={camalCase(iconChainName)} size={size} />
      </div>
    </Tooltip>
  );
}

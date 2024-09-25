import camalCase from "lodash.camelcase";
import { ChainIcon as _ChainIcon, Tooltip } from "@osn/common-ui";
import { normalizeChainName } from "frontedUtils/chain";

export function ChainIcon({ chainName, size }) {
  const normalizedChainName = normalizeChainName(chainName);
  return (
    <Tooltip content={normalizedChainName}>
      <div>
        <_ChainIcon chainName={camalCase(normalizedChainName)} size={size} />
      </div>
    </Tooltip>
  );
}

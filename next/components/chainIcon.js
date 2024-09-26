import camalCase from "lodash.camelcase";
import { ChainIcon as _ChainIcon, Tooltip } from "@osn/common-ui";
import { getChainDisplayName, normalizeChainName } from "frontedUtils/chain";

export function ChainIcon({ chainName, size }) {
  return (
    <Tooltip content={getChainDisplayName(chainName)}>
      <div>
        <_ChainIcon
          chainName={camalCase(normalizeChainName(chainName))}
          size={size}
        />
      </div>
    </Tooltip>
  );
}

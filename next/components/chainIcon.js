import camalCase from "lodash.camelcase";
import { ChainIcon as _ChainIcon, Tooltip } from "@osn/common-ui";

export function ChainIcon({ chainName, size }) {
  return (
    <Tooltip content={chainName}>
      <div>
        <_ChainIcon chainName={camalCase(chainName)} size={size} />
      </div>
    </Tooltip>
  );
}

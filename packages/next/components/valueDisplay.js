import styled from "styled-components";

import Tooltip from "components/tooltip";
import { abbreviateBigNumber, toFixedPrecision } from "frontedUtils";

export default function ValueDisplay({ value, space }) {
  const precision = toFixedPrecision(value, space?.decimals, 2, false);
  if (Number(precision) > 1000 || value?.toString()?.length > 6) {
    return (
      <Tooltip size="fit" content={`${precision} ${space?.symbol}`}>
        <div>{`${abbreviateBigNumber(precision)} ${space?.symbol}`}</div>
      </Tooltip>
    );
  }
  return `${precision} ${space?.symbol}`;
}

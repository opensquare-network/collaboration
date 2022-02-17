import Tooltip from "components/tooltip";
import { abbreviateBigNumber, getEffectiveNumbers, toPrecision } from "frontedUtils";

export default function ValueDisplay({ value, space, showAEM = false }) {
  const lost_precision = (getEffectiveNumbers(value) !== getEffectiveNumbers(abbreviateBigNumber(value)));
  const precision = toPrecision(value, space?.decimals);

  if (Number(precision) > 1000 || lost_precision) {
    return (
      <Tooltip size="fit" content={`${precision} ${space?.symbol}`}>
        <div>{showAEM && lost_precision && "≈"} {`${abbreviateBigNumber(precision)} ${space?.symbol}`}</div>
      </Tooltip>
    );
  }
  return `${precision} ${space?.symbol}`;
}

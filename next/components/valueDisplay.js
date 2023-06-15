import Tooltip from "components/tooltip";
import {
  abbreviateBigNumber,
  getEffectiveNumbers,
  toPrecision,
} from "frontedUtils";

/**
 * Render raw data into readable crypto amount
 * @param {string | BigNumber} value - raw full precision amount
 * @param {object} space - configuration info for the crypto/chain
 * @param {boolean} showAEM - Initial of showAlmostEqualMark, default false
 */

export default function ValueDisplay({
  value,
  space,
  showAEM = false,
  tooltipContent,
  noTooltip = false,
  noSymbol = false,
  className,
}) {
  const lostPrecision =
    getEffectiveNumbers(value) !==
    getEffectiveNumbers(abbreviateBigNumber(value));
  const precision = toPrecision(value, space?.decimals);

  if (Number(precision) > 1000 || lostPrecision) {
    return (
      <Tooltip
        size="fit"
        content={
          noTooltip ? "" : tooltipContent || `${precision} ${space?.symbol}`
        }
      >
        <div className={className}>
          {showAEM && lostPrecision && "≈"}{" "}
          {`${abbreviateBigNumber(precision)}${
            noSymbol ? "" : ` ${space?.symbol}`
          }`}
        </div>
      </Tooltip>
    );
  }
  return (
    <span className={className}>
      {precision}
      {noSymbol ? "" : ` ${space?.symbol}`}
    </span>
  );
}

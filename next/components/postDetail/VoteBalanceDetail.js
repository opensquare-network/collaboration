import { Fragment } from "react";
import {
  bigNumber2Locale,
  fromAssetUnit,
  toApproximatelyFixed,
} from "frontedUtils";
import BigNumber from "bignumber.js";

export default function VoteBalanceDetail({ details }) {
  return (
    <div>
      {(details || [])
        .filter((item) =>
          new BigNumber(item.balance).gte(item.votingThreshold || 0),
        )
        .map((item, index) => (
          <Fragment key={index}>
            {`${toApproximatelyFixed(
              bigNumber2Locale(fromAssetUnit(item.balance, item.decimals)),
            )} ${item.assetName || item.symbol}${
              item.multiplier !== 1 ? ` x${item.multiplier}` : ""
            }`}
            <br />
          </Fragment>
        ))}
    </div>
  );
}

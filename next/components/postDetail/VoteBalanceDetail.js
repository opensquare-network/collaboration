import { Fragment } from "react";
import {
  bigNumber2Locale,
  fromAssetUnit,
  toApproximatelyFixed,
} from "frontedUtils";

export default function VoteBalanceDetail({ details }) {
  return (
    <div>
      {details?.map((item, index) => (
        <Fragment key={index}>
          {`${toApproximatelyFixed(
            bigNumber2Locale(fromAssetUnit(item.balance, item.decimals)),
          )} ${item.symbol}${
            item.multiplier !== 1 ? ` x${item.multiplier}` : ""
          }`}
          <br />
        </Fragment>
      ))}
    </div>
  );
}

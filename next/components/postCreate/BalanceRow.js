import { ReactComponent as Loading } from "../../public/imgs/icons/loading.svg";
import Row from "@/components/row";
import Tooltip from "@/components/tooltip";
import { bigNumber2LocaleWithAbbr, toPrecision } from "../../frontedUtils";
import { memo } from "react";
import BigNumber from "bignumber.js";

function BalanceRow({ balance, isLoading, decimals, symbol }) {
  const isNaN = new BigNumber(balance).isNaN();
  const normalizedBalance = isNaN ? 0 : balance;

  if (isLoading) {
    return <Row header="Balance" content={<Loading />} />;
  }

  return (
    <Row
      header="Balance"
      content={
        <Tooltip
          content={`${toPrecision(normalizedBalance, decimals)} ${symbol}`}
        >
          {`${bigNumber2LocaleWithAbbr(normalizedBalance, decimals)} ${symbol}`}
        </Tooltip>
      }
    />
  );
}

export default memo(BalanceRow);

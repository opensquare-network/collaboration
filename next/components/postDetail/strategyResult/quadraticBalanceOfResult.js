import BigNumber from "bignumber.js";
import OptionList from "./common/optionList";

export default function QuadraticBalanceOfResult({
  proposal,
  voteStatus,
  space,
}) {
  const total = proposal?.votedWeights?.quadraticBalanceOf || 0;

  const optionList = [];
  proposal?.choices?.forEach((choice, index) => {
    for (let voteStat of voteStatus) {
      if (voteStat.choice !== choice) {
        continue;
      }

      const voteBalance = new BigNumber(voteStat.quadraticBalanceOf || 0);
      const percentage = (
        voteStat.balanceOf > 0 ? voteBalance.dividedBy(total) * 100 : 0
      ).toFixed(2);

      optionList.push({
        index: index + 1,
        choice,
        voteBalance,
        percentage,
      });

      return;
    }

    optionList.push({
      index: index + 1,
      choice,
      voteBalance: new BigNumber("0"),
      percentage: "0",
    });
  });

  return (
    <OptionList
      strategy="quadratic-balance-of"
      optionList={optionList}
      space={space}
    />
  );
}

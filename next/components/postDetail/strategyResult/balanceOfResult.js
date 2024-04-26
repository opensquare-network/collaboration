import BigNumber from "bignumber.js";
import OptionList from "./common/optionList";
import { Tooltip } from "@osn/common-ui";
import { SystemFail, SystemPass } from "@osn/icons/opensquare";

export default function BalanceOfResult({ proposal, space, voteStatus }) {
  let winnerChoice = null;
  for (let item of voteStatus) {
    if (new BigNumber(item.balanceOf).isZero()) {
      continue;
    }
    if (
      !winnerChoice ||
      new BigNumber(item.balanceOf).gte(winnerChoice.balanceOf)
    ) {
      winnerChoice = item;
    }
  }

  const isEnded = new Date().getTime() > proposal?.endDate;
  const passStatusText = isEnded ? "Passed" : "Passing";
  const failStatusText = isEnded ? "Failed" : "Failing";

  const total = proposal?.votedWeights?.balanceOf || 0;

  const optionList = [];
  proposal?.choices?.forEach((choice, index) => {
    for (let voteStat of voteStatus) {
      if (voteStat.choice !== choice) {
        continue;
      }

      const voteBalance = new BigNumber(voteStat.balanceOf || 0);
      const percentage = (
        voteStat.balanceOf > 0 ? voteBalance.dividedBy(total) * 100 : 0
      ).toFixed(2);

      const isWin = voteStat.choice === winnerChoice?.choice;

      optionList.push({
        index: index + 1,
        choice,
        voteBalance,
        percentage,
        icon: (
          <Tooltip content={isWin ? passStatusText : failStatusText}>
            <div className="inline-flex">
              {isWin ? <SystemPass /> : <SystemFail />}
            </div>
          </Tooltip>
        ),
      });

      return;
    }

    optionList.push({
      index: index + 1,
      choice,
      voteBalance: new BigNumber("0"),
      percentage: "0",
      icon: (
        <Tooltip content={failStatusText}>
          <div className="inline-flex">
            <SystemFail />
          </div>
        </Tooltip>
      ),
    });
  });

  return (
    <OptionList strategy="balance-of" optionList={optionList} space={space} />
  );
}

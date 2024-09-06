import BigNumber from "bignumber.js";
import { Tooltip } from "@osn/common-ui";
import { SystemFail, SystemPass } from "@osn/icons/opensquare";
import VoteCountOptionList from "./common/voteCountOptionList";

export default function SocietyVoteResult({ proposal, voteStatus }) {
  const total = proposal?.votedWeights?.societyVote || 0;

  let winnerChoice = null;
  for (let item of voteStatus) {
    if (new BigNumber(item.societyVote).isZero()) {
      continue;
    }
    if (
      (!winnerChoice ||
        new BigNumber(item.societyVote).gte(winnerChoice.societyVote)) &&
      new BigNumber(item.societyVote).div(total).gte(0.51)
    ) {
      winnerChoice = item;
    }
  }

  const isEnded = new Date().getTime() > proposal?.endDate;
  const passStatusText = isEnded ? "Passed" : "Passing";
  const failStatusText = isEnded ? "Failed" : "Failing";

  const optionList = [];
  proposal?.choices?.forEach((choice, index) => {
    for (let voteStat of voteStatus) {
      if (voteStat.choice !== choice) {
        continue;
      }

      const voteBalance = new BigNumber(voteStat.societyVote || 0);
      const percentage = (
        voteStat.societyVote > 0 ? voteBalance.dividedBy(total) * 100 : 0
      ).toFixed(2);

      const isWin = voteStat.choice === winnerChoice?.choice;

      optionList.push({
        index: index + 1,
        choice,
        voteBalance: voteBalance.toString(),
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
      voteBalance: "0",
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
    <VoteCountOptionList
      strategy="society"
      optionList={optionList}
      total={total}
    />
  );
}

import BigNumber from "bignumber.js";
import { Tooltip } from "@osn/common-ui";
import { SystemFail, SystemPass } from "@osn/icons/opensquare";
import VoteCountOptionList from "./common/voteCountOptionList";

export default function OnePersonOneVoteResult({ proposal, voteStatus }) {
  const total = proposal?.votedWeights?.onePersonOneVote || 0;

  let maxVote = 0;
  let winnerChoice = null;
  for (let item of voteStatus || []) {
    const currVote = new BigNumber(item.onePersonOneVote);
    if (currVote.isZero()) {
      continue;
    }
    if (!winnerChoice || currVote.gt(maxVote)) {
      maxVote = currVote;
      winnerChoice = item;
      continue;
    }
    if (currVote.eq(maxVote)) {
      winnerChoice = null;
      continue;
    }
  }

  const isEnded = new Date().getTime() > proposal?.endDate;
  const passStatusText = isEnded ? "Passed" : "Passing";
  const failStatusText = isEnded ? "Failed" : "Failing";

  const optionList = [];
  proposal?.choices?.forEach((choice, index) => {
    if (!voteStatus) {
      optionList.push({
        index: index + 1,
        choice,
        voteBalance: null,
        percentage: "0",
        icon: null,
      });
      return;
    }

    for (let voteStat of voteStatus) {
      if (voteStat.choice !== choice) {
        continue;
      }

      const voteBalance = new BigNumber(voteStat.onePersonOneVote || 0);
      const percentage = (
        voteStat.onePersonOneVote > 0 ? voteBalance.dividedBy(total) * 100 : 0
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
      strategy="one-person-one-vote"
      optionList={optionList}
      total={total}
    />
  );
}

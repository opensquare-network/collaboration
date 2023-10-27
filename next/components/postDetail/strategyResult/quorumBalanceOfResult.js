import BalanceOfResult from "./balanceOfResult";
import BigNumber from "bignumber.js";
import Quorum from "./common/quorum";

export default function QuorumBalanceOfResult({ proposal, space, voteStatus }) {
  const votedBalance = proposal?.votedWeights?.balanceOf || 0;

  const firstChoice = proposal?.choices?.[0];
  const firstChoiceVoteResult = voteStatus?.find(
    (vote) => vote.choice === firstChoice,
  );
  const firstChoiceVoteBalance = firstChoiceVoteResult?.balanceOf || 0;
  const gteFirstChoiceVoteBalanceCount = (voteStatus || []).filter((item) => {
    if (item.choice === firstChoice) {
      return false;
    }
    return new BigNumber(item.balanceOf).gte(firstChoiceVoteBalance);
  }).length;
  const isFirstChoiceWin = gteFirstChoiceVoteBalanceCount < 1;
  const isQuorumReached = new BigNumber(votedBalance).gte(space?.quorum);
  const isPass = isQuorumReached && isFirstChoiceWin;
  const isEnded = new Date().getTime() > proposal?.endDate;

  return (
    <>
      <BalanceOfResult
        proposal={proposal}
        space={space}
        voteStatus={voteStatus}
      />
      <Quorum
        votedBalance={votedBalance}
        space={space}
        isPass={isPass}
        isEnded={isEnded}
      />
    </>
  );
}

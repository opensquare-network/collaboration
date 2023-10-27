import Quorum from "./common/quorum";
import QuadraticBalanceOfResult from "./quadraticBalanceOfResult";
import BigNumber from "bignumber.js";

export default function QuorumQuadraticBalanceOfResult({
  proposal,
  space,
  voteStatus,
}) {
  const votedBalance = proposal?.votedWeights?.balanceOf || 0;

  const firstChoice = proposal?.choices?.[0];
  const firstChoiceVoteResult = voteStatus?.find(
    (vote) => vote.choice === firstChoice,
  );
  const firstChoiceVoteBalance = firstChoiceVoteResult?.quadraticBalanceOf || 0;
  const gteFirstChoiceVoteBalanceCount = (voteStatus || []).filter((item) => {
    if (item.choice === firstChoice) {
      return false;
    }
    return new BigNumber(item.quadraticBalanceOf).gte(firstChoiceVoteBalance);
  }).length;
  const isFirstChoiceWin = gteFirstChoiceVoteBalanceCount < 1;
  const isQuorumReached = new BigNumber(votedBalance).gte(space?.quorum);
  const isPass = isQuorumReached && isFirstChoiceWin;
  const isEnded = new Date().getTime() > proposal?.endDate;

  return (
    <>
      <QuadraticBalanceOfResult
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

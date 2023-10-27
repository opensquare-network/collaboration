import ValueDisplay from "@/components/valueDisplay";
import QuadraticBalanceOfResult from "./quadraticBalanceOfResult";
import {
  Divider,
  FlexAround,
  OptionIndex,
  ProgressItem,
  ResultHead,
  ResultName,
  StatusItem,
  StatusWrapper,
} from "./common/styled";
import BigNumber from "bignumber.js";

export default function QuorumQuadraticBalanceOfResult({
  proposal,
  space,
  voteStatus,
}) {
  const isEnded = new Date().getTime() > proposal?.endDate;
  const votedBalance = proposal?.votedWeights?.balanceOf || 0;

  const firstChoice = proposal?.choices?.[0];
  const firstChoiceVoteResult = voteStatus?.find(
    (vote) => vote.choice === firstChoice,
  );
  const firstChoiceVoteBalance = firstChoiceVoteResult?.quadraticBalanceOf || 0;
  const gteFirstChoiceVoteBalanceCount = (voteStatus || []).filter((item) =>
    new BigNumber(item.quadraticBalanceOf).gte(firstChoiceVoteBalance),
  ).length;
  const isFirstChoiceWin = gteFirstChoiceVoteBalanceCount === 1;
  const isQuorumReached = new BigNumber(votedBalance).gte(space?.quorum);
  const isPass = isQuorumReached && isFirstChoiceWin;

  return (
    <>
      <QuadraticBalanceOfResult
        proposal={proposal}
        space={space}
        voteStatus={voteStatus}
      />
      <ResultHead>
        <ResultName>Quorum</ResultName>
      </ResultHead>
      <Divider />
      <div>
        <ProgressItem>
          <OptionIndex>Quorum</OptionIndex>
          <FlexAround>
            <ValueDisplay value={votedBalance} space={space} noSymbol />
            <span>&nbsp;/&nbsp;</span>
            <ValueDisplay
              value={space?.quorum || 0}
              space={space}
              noSymbol
              className="quorum-value"
            />
          </FlexAround>
        </ProgressItem>
      </div>
      <StatusWrapper>
        <StatusItem positive={isPass}>
          {isPass
            ? isEnded
              ? "Passed"
              : "Passing"
            : isEnded
            ? "Failed"
            : "Failing"}
        </StatusItem>
      </StatusWrapper>
    </>
  );
}

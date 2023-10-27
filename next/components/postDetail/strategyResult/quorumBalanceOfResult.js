import ValueDisplay from "@/components/valueDisplay";
import BalanceOfResult from "./balanceOfResult";
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

export default function QuorumBalanceOfResult({ proposal, space, voteStatus }) {
  const isEnded = new Date().getTime() > proposal?.endDate;
  const votedBalance = proposal?.votedWeights?.balanceOf || 0;

  const firstChoice = proposal?.choices?.[0];
  const firstChoiceVoteResult = voteStatus?.find(
    (vote) => vote.choice === firstChoice,
  );
  const firstChoiceVoteBalance = firstChoiceVoteResult?.balanceOf || 0;
  const gteFirstChoiceVoteBalanceCount = (voteStatus || []).filter((item) =>
    new BigNumber(item.balanceOf).gte(firstChoiceVoteBalance),
  ).length;
  const isFirstChoiceWin = gteFirstChoiceVoteBalanceCount === 1;
  const isQuorumReached = new BigNumber(votedBalance).gte(space?.quorum);
  const isPass = isQuorumReached && isFirstChoiceWin;

  return (
    <>
      <BalanceOfResult
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

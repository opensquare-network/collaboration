import ValueDisplay from "../valueDisplay";
import Panel from "@/components/postDetail/panel";
import SideSectionTitle from "@/components/sideBar/sideSectionTitle";
import BalanceOfResult from "./strategyResult/balanceOfResult";
import QuadraticBalanceOfResult from "./strategyResult/quadraticBalanceOfResult";
import BiasedVotingResult from "./strategyResult/biasedVotingResult";
import Divider from "../styled/divider";
import { VoteItem } from "./strategyResult/common/styled";
import QuorumBalanceOfResult from "./strategyResult/quorumBalanceOfResult";
import QuorumQuadraticBalanceOfResult from "./strategyResult/quorumQuadraticBalanceOfResult";
import OnePersonOneVoteResult from "./strategyResult/onePersonOneVoteResult";
import {
  hasBalanceStrategy,
  hasSocietyVoteStrategyOnly,
} from "frontedUtils/strategy";
import QuorumSocietyVoteResult from "./strategyResult/quorumSocietyVoteResult";
import isNil from "lodash.isnil";
import LoadingField from "../loadingField";

export function InnerPostResult({ data, voteStatus, space }) {
  let votedAmount;
  let societyVotedAmount;
  if (data) {
    votedAmount = data.votedWeights?.balanceOf || 0;
    societyVotedAmount = data.votedWeights?.societyVote || 0;
  }

  const results = data?.weightStrategy?.map((strategy) => {
    if (strategy === "balance-of") {
      return (
        <BalanceOfResult
          key={strategy}
          proposal={data}
          space={space}
          voteStatus={voteStatus}
        />
      );
    }

    if (strategy === "quorum-balance-of") {
      return (
        <QuorumBalanceOfResult
          key={strategy}
          proposal={data}
          space={space}
          voteStatus={voteStatus}
        />
      );
    }

    if (strategy === "quadratic-balance-of") {
      return (
        <QuadraticBalanceOfResult
          key={strategy}
          proposal={data}
          space={space}
          voteStatus={voteStatus}
        />
      );
    }

    if (strategy === "quorum-quadratic-balance-of") {
      return (
        <QuorumQuadraticBalanceOfResult
          key={strategy}
          proposal={data}
          space={space}
          voteStatus={voteStatus}
        />
      );
    }

    if (strategy === "one-person-one-vote") {
      return (
        <OnePersonOneVoteResult
          key={strategy}
          proposal={data}
          voteStatus={voteStatus}
        />
      );
    }

    if (strategy === "society") {
      return (
        <QuorumSocietyVoteResult
          key={strategy}
          proposal={data}
          voteStatus={voteStatus}
        />
      );
    }

    return null;
  });

  const biasedVoting = (
    <BiasedVotingResult proposal={data} space={space} voteStatus={voteStatus} />
  );

  let voted = null;
  if (hasBalanceStrategy(data?.weightStrategy)) {
    voted = (
      <VoteItem>
        <div>Voted</div>
        <div>
          <LoadingField isLoading={isNil(votedAmount)}>
            <ValueDisplay value={votedAmount?.toString()} space={space} />
          </LoadingField>
        </div>
      </VoteItem>
    );
  } else if (hasSocietyVoteStrategyOnly(data?.weightStrategy)) {
    voted = (
      <VoteItem>
        <div>Voted</div>
        <div>
          <LoadingField isLoading={isNil(societyVotedAmount)}>
            {societyVotedAmount} VOTE
          </LoadingField>
        </div>
      </VoteItem>
    );
  }

  return (
    <>
      <SideSectionTitle title="Results" img="/imgs/icons/strategy.svg" />
      <Divider />
      <div>
        {voted}
        <VoteItem>
          <div>Voters</div>
          <div>
            <LoadingField isLoading={isNil(data?.votesCount)}>
              {data?.votesCount}
            </LoadingField>
          </div>
        </VoteItem>
      </div>
      {results}
      {biasedVoting}
    </>
  );
}

export default function PostResultPanel({ data, voteStatus, space }) {
  return (
    <Panel>
      <InnerPostResult data={data} voteStatus={voteStatus} space={space} />
    </Panel>
  );
}

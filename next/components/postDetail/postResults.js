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

export default function PostResult({ data, voteStatus, space }) {
  const votedAmount = data?.votedWeights?.balanceOf || 0;

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

    return null;
  });

  const biasedVoting = (
    <BiasedVotingResult proposal={data} space={space} voteStatus={voteStatus} />
  );

  return (
    <Panel>
      <SideSectionTitle title="Results" img="/imgs/icons/strategy.svg" />
      <Divider />
      <div>
        <VoteItem>
          <div>Voted</div>
          <div>
            <ValueDisplay value={votedAmount?.toString()} space={space} />
          </div>
        </VoteItem>
        <VoteItem>
          <div>Voters</div>
          <div>{data?.votesCount}</div>
        </VoteItem>
      </div>
      {results}
      {biasedVoting}
    </Panel>
  );
}

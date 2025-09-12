import ValueDisplay from "../valueDisplay";
import Panel from "@/components/postDetail/panel";
import SideSectionTitle from "@/components/sideBar/sideSectionTitle";
import Divider from "../styled/divider";
import { VoteItem } from "./strategyResult/common/styled";
import {
  hasBalanceStrategy,
  hasSocietyVoteStrategyOnly,
} from "frontedUtils/strategy";
import isNil from "lodash.isnil";
import LoadingField from "../loadingField";
import StrategyResult from "./strategyResult";

export function InnerPostResult({ data, voteStatus, space }) {
  const votedAmount = data?.votedWeights?.balanceOf || 0;
  const societyVotedAmount = data?.votedWeights?.societyVote || 0;

  let voted = null;
  if (hasBalanceStrategy(data?.weightStrategy)) {
    voted = (
      <VoteItem>
        <div>Voted</div>
        <div>
          <LoadingField isLoading={isNil(data)}>
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
          <LoadingField isLoading={isNil(data)}>
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
            <LoadingField isLoading={isNil(data)}>
              {data?.votesCount}
            </LoadingField>
          </div>
        </VoteItem>
      </div>
      <StrategyResult data={data} voteStatus={voteStatus} space={space} />
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

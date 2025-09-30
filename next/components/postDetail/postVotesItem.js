import { Fragment } from "react";
import styled from "styled-components";
import Ellipsis from "@/components/ellipsis";
import { Flex, IpfsSquare } from "@osn/common-ui";
import ValueDisplay from "@/components/valueDisplay";
import Voter from "@/components/role/voter";
import { Tooltip } from "@osn/common-ui";
import VoteBalanceDetail from "./VoteBalanceDetail";
import { isZero } from "frontedUtils";
import {
  hasBalanceStrategy,
  hasSocietyVoteStrategyOnly,
} from "frontedUtils/strategy";
import { MarkdownPreviewer } from "@osn/previewer";
import ToggleCollapsed from "../toggleCollapsed";
import { useActiveAnchor } from "hooks/notification/useAnchor";

const Item = styled.div`
  padding: 20px 32px;
  border-bottom: 1px solid var(--strokeBorderDefault);
  @media screen and (max-width: 800px) {
    padding: 20px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  line-height: 24px;
  .center {
    justify-content: center;
  }
  @media screen and (max-width: 800px) {
    gap: 8px;
    align-items: start;
  }
`;

const ContentWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const Content = styled.div`
  padding: 8px 0 0 28px;
  line-height: 24px;
  color: var(--textSecondary);
`;

const BalanceWrapper = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  white-space: nowrap;
  > :not(:first-child) {
    margin-left: 8px;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const EqualWrapper = styled.div`
  width: 33%;
  display: flex;
  overflow: visible;
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (max-width: 800px) {
    overflow: hidden;
    justify-content: flex-end;
    width: auto;
    padding: 0 6px;
  }
`;

const MyVoteTag = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--fillBgTertiary);
  color: var(--textSecondary);
  border-radius: 9px;
  padding: 2px 10px;
  font-weight: 600;
  font-size: 10px;
  line-height: 14px;
  white-space: nowrap;
  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: 8px;
`;

const DelegationTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 8px;

  border: 1px solid var(--strokeActionDefault);
  border-radius: 9px;

  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;

  color: var(--textTertiary);

  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: 8px;
`;

const Vote = styled(Flex)`
  > div:nth-child(1) {
    position: relative;
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
`;

const Choices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MobileOnly = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const VoterWrapper = styled.div`
  width: 33%;
  display: flex;
  overflow: visible;
  flex-wrap: wrap;

  @media screen and (max-width: 800px) {
    overflow: hidden;
    width: auto;
  }
`;

function getChoiceIndex(choices, userChoice) {
  if (userChoice.length > 10) {
    for (let index in choices) {
      if (choices[index] === userChoice) {
        return `# ${parseInt(index) + 1}`;
      }
    }
  }

  return userChoice;
}

export default function PostVotesItem({
  choices,
  data,
  space,
  isMyVote = false,
  isDelegate = false,
  isSafari = false,
}) {
  const spaceSupportMultiChain = space?.networks?.length > 1;
  const { id, active } = useActiveAnchor(`vote_${data.cid}`);

  return (
    <Item id={id} className={active ? "bg-strokeBorderDefault" : ""}>
      <InfoWrapper>
        <VoterWrapper>
          <Voter
            address={data.voter ?? data.address}
            network={data.voterNetwork}
            showNetwork={spaceSupportMultiChain}
            isSafari={isSafari}
          />
          {isMyVote && <MyVoteTag>Mine</MyVoteTag>}
          {isDelegate && <DelegationTag>Delegation</DelegationTag>}
        </VoterWrapper>
        <EqualWrapper>
          <Vote>
            <Tooltip
              content={
                <>
                  {data.choices.map((choice) => (
                    <Fragment key={choice}>
                      {choice}
                      <br />
                    </Fragment>
                  ))}
                </>
              }
            >
              <div>
                <Choices>
                  {data.choices.map((choice) => (
                    <Ellipsis key={choice} width={189}>
                      {choice}
                    </Ellipsis>
                  ))}
                </Choices>
              </div>
            </Tooltip>
            <MobileOnly>
              <Choices>
                {data.choices.map((choice) => (
                  <span key={choice}>{getChoiceIndex(choices, choice)}</span>
                ))}
              </Choices>
            </MobileOnly>
          </Vote>
        </EqualWrapper>
        <BalanceWrapper>
          {hasBalanceStrategy(space.strategies) && (
            <ValueDisplay
              value={data.weights?.balanceOf}
              space={space}
              showAEM={true}
              tooltipContent={
                !isZero(data.weights?.balanceOf) ? (
                  <VoteBalanceDetail details={data.weights?.details} />
                ) : null
              }
            />
          )}
          {hasSocietyVoteStrategyOnly(space.strategies) && (
            <span>{data.weights?.societyVote} VOTE</span>
          )}
          <IpfsSquare
            href={
              data?.pinHash &&
              `${process.env.NEXT_PUBLIC_API_END_POINT}api/ipfs/files/${data.pinHash}`
            }
          />
        </BalanceWrapper>
      </InfoWrapper>
      <ContentWrapper>
        <ContentPreviewer data={data} />
      </ContentWrapper>
    </Item>
  );
}

function ContentPreviewer({ data }) {
  if (!data.remark) {
    return null;
  }
  if (data.remarkType === "markdown") {
    return (
      <ToggleCollapsed collapsedHeight={240}>
        <div className="pl-7 pt-2 proposal-vote-remark-markdown">
          <MarkdownPreviewer content={data.remark} />
        </div>
      </ToggleCollapsed>
    );
  }
  return <Content>{data.remark}</Content>;
}

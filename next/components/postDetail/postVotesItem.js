import { Fragment } from "react";
import styled, { css } from "styled-components";
import ExternalLink from "@osn/common-ui/es/ExternalLink";
import Ellipsis from "@/components/ellipsis";
import { Flex } from "@osn/common-ui";
import ValueDisplay from "@/components/valueDisplay";
import Voter from "@/components/role/voter";
import Tooltip from "@/components/tooltip";
import VoteBalanceDetail from "./VoteBalanceDetail";
import { isZero } from "frontedUtils";

const Item = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #f0f3f8;
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
  }
`;

const ContentWrapper = styled.div`
  padding: 8px 0 0 28px;
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const Content = styled.div`
  line-height: 24px;
  color: rgba(80, 97, 118, 1);
`;

const BalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  > :not(:first-child) {
    margin-left: 8px;
  }
`;

const Square = styled.div`
  width: 20px;
  height: 20px;
  background: url("/imgs/icons/ipfs.svg");
  ${(p) =>
    !p.noHover &&
    css`
      cursor: pointer;
      :hover {
        background: url("/imgs/icons/ipfs-active.svg");
      }
    `}
`;

const EqualWrapper = styled.div`
  width: 33%;
  display: flex;
  overflow: visible;
  flex-wrap: wrap;
  :last-child {
    justify-content: flex-end;
  }
  @media screen and (max-width: 800px) {
    overflow: hidden;
  }
`;

const MyVoteTag = styled.div`
  display: flex;
  align-items: center;
  background: #f0f3f8;
  color: #506176;
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

  border: 1px solid #d2d9e2;
  border-radius: 9px;

  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;

  color: #a1a8b3;

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

const VoterWrapper = styled(EqualWrapper)``;

function getChoiceIndex(choices, userChoice) {
  for (let index in choices) {
    if (choices[index] === userChoice) {
      return parseInt(index) + 1;
    }
  }
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
  return (
    <Item>
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
        <EqualWrapper className="center">
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
                  <span key={choice}>{`# ${getChoiceIndex(
                    choices,
                    choice,
                  )}`}</span>
                ))}
              </Choices>
            </MobileOnly>
          </Vote>
        </EqualWrapper>
        <EqualWrapper>
          <BalanceWrapper>
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
            {data?.pinHash ? (
              <ExternalLink
                href={`${process.env.NEXT_PUBLIC_API_END_POINT}api/ipfs/files/${data.pinHash}`}
              >
                <Square />
              </ExternalLink>
            ) : (
              <Square noHover={true} />
            )}
          </BalanceWrapper>
        </EqualWrapper>
      </InfoWrapper>
      {data.remark && (
        <ContentWrapper>
          <Content>{data.remark}</Content>
        </ContentWrapper>
      )}
    </Item>
  );
}

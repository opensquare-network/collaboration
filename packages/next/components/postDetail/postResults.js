import styled from "styled-components";
import { p_14_medium, p_16_semibold } from "styles/textStyles";
import BigNumber from "bignumber.js";
import { toFixedPrecision } from "../../frontedUtils";
import { Fragment } from "react";
import ValueDisplay from "../valueDisplay";

const Wrapper = styled.div`
  padding: 32px;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }
`;

const TitleWrapper = styled.div`
  ${p_16_semibold};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 12px 0;
`;

const VoteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${p_14_medium};

  > :first-child {
    color: #506176;
  }
`;

const ProgressItem = styled.div`
  margin: 12px 0 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${p_14_medium};
`;

const ProgressBackground = styled.div`
  height: 6px;
  border-radius: 3px;
  background: #f0f3f8;
  position: relative;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  position: absolute;
  height: 6px;
  left: 0;
  top: 0;
  background: #6848ff;
  width: ${(p) => p.percent};
`;

const OptionIndex = styled.div`
  width: 40px;
  ${p_14_medium};
  color: #a1a8b3;
`;

const ResultHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
`;

const StatusResultHead = styled(ResultHead)`
  margin-top: 0;
`;

const ResultStatus = styled.span`
  font-weight: 500;
`;

const ResultName = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1e2134;
`;

const StatusResultName = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #506176;
`;

const FlexAround = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

const BiasedVotingWrapper = styled.div`
  > * {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    > :first-child {
      color: #506176;
    }
  }
`;

const StatusWrapper = styled.div`
  margin-top: 12px;
  > :not(:first-child) {
    margin-top: 12px;
  }
`;

const StatusItem = styled.div`
  padding: 12px;
  font-weight: bold;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  color: ${(p) => (p.positive ? "#4CAF50" : "#EE4444")};
  background: ${(p) => (p.positive ? "#EDF7ED" : "#FDECEC")};
`;

const RMRK_ELECTORATE_CONST = "100000000000000000";

export default function PostResult({ data, voteStatus, space }) {
  const votedAmount = data?.votedWeights?.balanceOf || 0;
  const isEnded = new Date().getTime() > data?.endDate;

  const results = data?.weightStrategy
    ?.filter((strategy) =>
      ["balance-of", "quadratic-balance-of"].includes(strategy)
    )
    .map?.((strategy, strategyIndex) => {
      const total =
        strategy === "quadratic-balance-of"
          ? data?.votedWeights?.quadraticBalanceOf || 0
          : data?.votedWeights?.balanceOf || 0;

      const optionList = [];
      data?.choices?.forEach((choice, index) => {
        for (let voteStat of voteStatus) {
          if (voteStat.choice !== choice) {
            continue;
          }

          const voteBalance = new BigNumber(
            strategy === "quadratic-balance-of"
              ? voteStat.quadraticBalanceOf || 0
              : voteStat.balanceOf || 0
          );
          const percentage = (
            voteStat.balanceOf > 0 ? voteBalance.dividedBy(total) * 100 : 0
          ).toFixed(2);
          optionList.push({ index: index + 1, voteBalance, percentage });
          return;
        }
        optionList.push({
          index: index + 1,
          voteBalance: new BigNumber("0"),
          percentage: "0",
        });
      });

      return (
        <Fragment key={strategyIndex}>
          <ResultHead>
            <ResultName>{strategy}</ResultName>
          </ResultHead>
          <Divider />
          {optionList.map((vote, index) => {
            return (
              <div key={index}>
                <ProgressItem>
                  <OptionIndex>#{vote.index}</OptionIndex>
                  <FlexAround>
                    <div>{vote.percentage}%</div>
                    {
                      <div>
                        <ValueDisplay value={vote.voteBalance} space={space} />
                      </div>
                    }
                  </FlexAround>
                </ProgressItem>
                <ProgressBackground>
                  <ProgressBar percent={`${vote.percentage}%`} />
                </ProgressBackground>
              </div>
            );
          })}
        </Fragment>
      );
    });

  const biasedVoting = (() => {
    if (
      !["rmrk", "rmrk-curation"].includes(data?.space) ||
      !data?.weightStrategy?.includes("biased-voting") ||
      voteStatus?.length !== 2
    )
      return null;
    return (
      <Fragment>
        <ResultHead>
          <ResultName>biased-voting</ResultName>
        </ResultHead>
        <Divider />
        <BiasedVotingWrapper>
          {(voteStatus || []).map((item, index) => (
            <div key={index}>
              <div>{item.choice}</div>
              <ValueDisplay value={item.balanceOf} space={space} />
            </div>
          ))}
          <div>
            <div>Turnout</div>
            <ValueDisplay
              value={voteStatus.reduce((pre, cur) =>
                new BigNumber(pre.balanceOf ?? 0).plus(
                  new BigNumber(cur.balanceOf ?? 0)
                )
              )}
              space={space}
            />
          </div>
          <div>
            <div>Electorate</div>
            <div>
              <ValueDisplay value={RMRK_ELECTORATE_CONST} space={space} />
            </div>
          </div>
        </BiasedVotingWrapper>
        <Divider />
        <StatusResultHead>
          <StatusResultName>Status</StatusResultName>
          <ResultStatus>SuperMajorityApprove</ResultStatus>
        </StatusResultHead>
        <StatusWrapper>
          <StatusItem
            positive={voteStatus?.[0]?.biasedVoting?.superMajorityApprove}
          >
            #1{" "}
            {voteStatus?.[0]?.biasedVoting?.superMajorityApprove
              ? isEnded
                ? "Passed"
                : "Passing"
              : isEnded
              ? "Failed"
              : "Failing"}
          </StatusItem>
        </StatusWrapper>
        <Divider />
        <StatusResultHead>
          <StatusResultName>Status</StatusResultName>
          <ResultStatus>SuperMajorityAgainst</ResultStatus>
        </StatusResultHead>
        <StatusWrapper>
          <StatusItem
            positive={voteStatus?.[0]?.biasedVoting?.superMajorityAgainst}
          >
            #1{" "}
            {voteStatus?.[0]?.biasedVoting?.superMajorityAgainst
              ? isEnded
                ? "Passed"
                : "Passing"
              : isEnded
              ? "Failed"
              : "Failing"}
          </StatusItem>
        </StatusWrapper>
      </Fragment>
    );
  })();

  return (
    <Wrapper>
      <TitleWrapper>
        Results
        <img src="/imgs/icons/strategy.svg" alt="" />
      </TitleWrapper>
      <Divider />
      <div>
        <VoteItem>
          <div>Voted</div>
          <div>
            {toFixedPrecision(votedAmount?.toString(), space.decimals)}{" "}
            {space.symbol}
          </div>
        </VoteItem>
        <VoteItem>
          <div>Voters</div>
          <div>{data?.votesCount}</div>
        </VoteItem>
      </div>
      {results}
      {biasedVoting}
    </Wrapper>
  );
}

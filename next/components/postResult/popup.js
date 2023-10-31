import styled, { css } from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { p_14_medium, p_16_semibold } from "styles/textStyles";
import ValueDisplay from "../valueDisplay";
import { votesSelector, fetchVote } from "store/reducers/voteSlice";
import { ReactComponent as LoadingSvg } from "public/imgs/icons/loading.svg";
import BigNumber from "bignumber.js";

const ResultWrapper = styled.div`
  z-index: 999;
  position: absolute;
  background: #ffffff;
  filter: drop-shadow(0px 4px 31px rgba(26, 33, 44, 0.06))
    drop-shadow(0px 0.751293px 8px rgba(26, 33, 44, 0.04));
  padding: 24px;
  width: 300px;
  right: -24px;
  bottom: 32px;
  svg {
    height: 24px;
  }
  ${(p) =>
    !p.isTop &&
    css`
      top: 32px;
      bottom: auto;
    `}
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #ffffff;
  right: 24px;
  top: 100%;
`;

const TriangleTop = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #ffffff;
  right: 24px;
  top: -8px;
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
  margin: 16px 0;
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
  ${p_14_medium};
  color: #a1a8b3;
`;

const OptionChoice = styled.div`
  max-width: 212px;
  text-align: right;
  word-wrap: break-word;
`;

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const FlexAround = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
`;

export default function Popup({ data, space, isTop }) {
  const votes = useSelector(votesSelector);
  const dispatch = useDispatch();

  const vote = votes[data?.cid];
  const total = vote?.reduce(
    (pre, cur) => BigNumber(pre).plus(BigNumber(cur.balanceOf ?? 0)),
    0,
  );
  const voteCount = vote?.reduce(
    (pre, cur) => pre + Number(cur.votesCount ?? 0),
    0,
  );

  const results = (data?.choices || []).map((choice, index) => {
    const balance = vote
      ? vote.find((item) => item.choice === choice)?.balanceOf
      : 0;
    const percent =
      vote && Number(balance) > 0
        ? (BigNumber(balance).dividedBy(total) * 100).toFixed(2)
        : "0.00";
    return (
      <div key={index}>
        <ProgressItem>
          <OptionWrapper>
            <OptionIndex>#{index + 1}</OptionIndex>
            <OptionChoice>{choice}</OptionChoice>
          </OptionWrapper>
          <FlexAround>
            <div>{percent}%</div>
            {vote ? (
              <div>
                <ValueDisplay value={balance} space={space} />
              </div>
            ) : (
              <LoadingSvg />
            )}
          </FlexAround>
        </ProgressItem>
        <ProgressBackground>
          <ProgressBar percent={`${percent}%`} />
        </ProgressBackground>
      </div>
    );
  });

  useEffect(() => {
    if (data?.cid && !votes[data?.cid]) {
      dispatch(fetchVote(data?.cid, data?.space));
    }
  }, [votes, data, dispatch]);

  return (
    <ResultWrapper isTop={isTop}>
      <TitleWrapper>
        Results
        <img src="/imgs/icons/strategy.svg" alt="" />
      </TitleWrapper>
      <Divider />
      <div>
        <VoteItem>
          <div>Voted</div>
          {vote ? (
            <ValueDisplay value={total?.toString()} space={space} />
          ) : (
            <LoadingSvg />
          )}
        </VoteItem>
        <VoteItem>
          <div>Voters</div>
          {vote ? <div>{voteCount}</div> : <LoadingSvg />}
        </VoteItem>
      </div>
      <Divider />
      {results}
      {isTop ? <Triangle /> : <TriangleTop />}
    </ResultWrapper>
  );
}

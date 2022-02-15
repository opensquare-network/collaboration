import styled, { css } from "styled-components";
import { useRef, useState } from "react";

import StatusSvg from "public/imgs/icons/status.svg";
import { useOffset } from "frontedUtils/hooks";
import { p_14_medium, p_16_semibold } from "styles/textStyles";
import ValueDisplay from "./valueDisplay";

const Wrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 40px;
  display: none;
  svg {
    fill: #a1a8b3;
  }
  :hover {
    svg {
      fill: #506176;
    }
  }
`;

const ResultWrapper = styled.div`
  position: absolute;
  background: #ffffff;
  filter: drop-shadow(0px 4px 31px rgba(26, 33, 44, 0.06))
    drop-shadow(0px 0.751293px 8px rgba(26, 33, 44, 0.04));
  padding: 24px;
  width: 300px;
  right: -24px;
  bottom: 32px;
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

const FlexAround = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

export default function ResultPopup() {
  const ref = useRef();
  const { top } = useOffset(ref);
  const [show, setShow] = useState(false);

  return (
    <Wrapper ref={ref}>
      <IconWrapper
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="icon"
      >
        <StatusSvg />
      </IconWrapper>
      {show && (
        <ResultWrapper isTop={top > 400}>
          <TitleWrapper>
            Results
            <img src="/imgs/icons/strategy.svg" alt="" />
          </TitleWrapper>
          <Divider />
          <div>
            <VoteItem>
              <div>Voted</div>
              <div>
                {/* {toFixedPrecision(votedAmount?.toString(), space.decimals)}{" "}
              {space.symbol} */}
                123
              </div>
            </VoteItem>
            <VoteItem>
              <div>Voters</div>
              {/* <div>{data?.votesCount}</div> */}
              123
            </VoteItem>
          </div>
          <Divider />
          <div>
            <ProgressItem>
              <OptionIndex>#1</OptionIndex>
              <FlexAround>
                <div>33%</div>
                {
                  <div>
                    {/* <ValueDisplay value={vote.voteBalance} space={space} /> */}
                  </div>
                }
              </FlexAround>
            </ProgressItem>
            <ProgressBackground>
              <ProgressBar percent={`10%`} />
            </ProgressBackground>
          </div>
          {top > 400 ? <Triangle /> : <TriangleTop />}
        </ResultWrapper>
      )}
    </Wrapper>
  );
}

import styled from "styled-components";
import { p_14_medium } from "styles/textStyles";

export const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 12px 0;
`;

export const VoteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${p_14_medium};

  > :first-child {
    color: #506176;
  }
`;

export const ProgressItem = styled.div`
  margin: 12px 0 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${p_14_medium};
`;

export const ProgressBackground = styled.div`
  height: 6px;
  border-radius: 3px;
  background: #f0f3f8;
  position: relative;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  position: absolute;
  height: 6px;
  left: 0;
  top: 0;
  background: #6848ff;
  width: ${(p) => p.percent};
`;

export const OptionIndex = styled.div`
  max-width: 118px;
  ${p_14_medium};
  color: #a1a8b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ResultHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
`;

export const StatusResultHead = styled(ResultHead)`
  margin-top: 0;
`;

export const ResultStatus = styled.span`
  font-weight: 500;
`;

export const ResultName = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1e2134;
`;

export const StatusResultName = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #506176;
`;

export const SubtitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Subtitle = styled.div`
  line-height: 0;
  cursor: pointer;
  justify-self: flex-start;
  margin-left: 8px;
  svg {
    fill: #a1a8b3;
  }
  :hover {
    svg {
      fill: #506176;
    }
  }
`;

export const FlexAround = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: right;

  .quorum-value {
    color: rgba(161, 168, 179, 1);
  }
`;

export const BiasedVotingWrapper = styled.div`
  > * {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
  }
`;

export const StatusWrapper = styled.div`
  margin-top: 12px;
  > :not(:first-child) {
    margin-top: 12px;
  }
`;

export const StatusItem = styled.div`
  padding: 12px;
  font-weight: bold;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  color: ${(p) => (p.positive ? "#4CAF50" : "#EE4444")};
  background: ${(p) => (p.positive ? "#EDF7ED" : "#FDECEC")};
`;

import styled from "styled-components";
import { p_14_medium } from "styles/textStyles";

export const Divider = styled.div`
  height: 1px;
  background-color: var(--fillBgTertiary);
  margin: 12px 0;
`;

export const VoteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${p_14_medium};

  > :first-child {
    color: var(--textSecondary);
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
  background-color: var(--fillBgTertiary);
  position: relative;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  position: absolute;
  height: 6px;
  left: 0;
  top: 0;
  background: var(--fillBgBrandPrimary);
  width: ${(p) => p.percent};
`;

export const OptionIndex = styled.div`
  max-width: 118px;
  ${p_14_medium};
  color: var(--textTertiary);
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
  color: var(--textPrimary);
`;

export const StatusResultName = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--textSecondary);
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
    fill: var(--textTertiary);
  }
  :hover {
    svg {
      fill: var(--textSecondary);
    }
  }
`;

export const FlexAround = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: right;

  .quorum-value {
    color: var(--textTertiary);
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
  color: ${(p) =>
    p.positive ? "var(--textFeedbackSuccess)" : "var(--textFeedbackError)"};
  background: ${(p) =>
    p.positive ? "var(--accentGreen25a)" : "var(--accentRed25a)"};
`;

import styled from "styled-components";

export const Name = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--textSecondary);
`;

export const Value = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--textTertiary);
`;

export const Sections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const SpaceName = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: var(--textPrimary);
`;

export const TokenSymbol = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: var(--textTertiary);
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

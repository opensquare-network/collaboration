import styled from "styled-components";
import Panel from "../postDetail/panel";

export const SectionTitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1e2134;
  margin-bottom: 16px;
`;

export const Hint = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;

  > * {
    &::before {
      content: "•";
      margin-right: 8px;
    }
    margin: 0 0 0 0 !important;
  }
`;

export const MyPanel = styled(Panel)`
  > :not(:first-child) {
    margin-top: 32px;
  }
`;

export const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

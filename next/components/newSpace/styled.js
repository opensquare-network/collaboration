import styled from "styled-components";
import Panel from "../postDetail/panel";

export const SectionTitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--textPrimary);
  margin-bottom: 16px;
`;

export const Hint = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: var(--textTertiary);

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

export const SelectTypeTitle = styled.div`
  color: var(--textPrimary);
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  text-align: center;
  padding-bottom: 40px;
`;

export const SelectTypeItem = styled.a`
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border: 1px solid var(--strokeActionDefault);
  background: var(--fillBgPrimary);
  width: 300px;
  box-shadow: var(--shadowCardDefault);
  :hover {
    box-shadow: var(--shadowCardHover);
  }
`;

export const SelectTypeItemTitle = styled.div`
  color: var(--textPrimary);
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

export const SelectTypeItemDesc = styled.div`
  color: var(--textTertiary);
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

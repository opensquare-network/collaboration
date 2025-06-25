import styled from "styled-components";
import Panel from "@/components/postDetail/panel";

export const Wrapper = styled(Panel)`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: var(--fillBgTertiary);
  margin: 12px 0;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  > :first-child {
    color: var(--textSecondary);
    margin-right: 8px;
  }

  > :last-child {
    flex-grow: 1;
    text-align: right;
    justify-content: end;
  }
`;

export const TimestampWrapper = styled.div``;

export const TimestampItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  > :first-child {
    color: var(--textSecondary);
  }

  span {
    text-align: right;
  }
`;

export const SnapshotsWrapper = styled.div`
  display: flex;
  justify-content: end;
  > div {
    line-height: 0;
  }

  & > div:not(:first-child) {
    margin-left: 4px;
  }
`;

import styled from "styled-components";
import { ReactComponent as AddAvg } from "./add.svg";
import { noop } from "@osn/common-ui";

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const Text = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--textBrandSecondary);
`;

export default function NewButton({ onClick = noop, children }) {
  return (
    <Wrapper onClick={onClick}>
      <AddAvg />
      <Text>{children}</Text>
    </Wrapper>
  );
}

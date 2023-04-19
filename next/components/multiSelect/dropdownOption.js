import { noop } from "@osn/common-ui";
import styled from "styled-components";
import OptionCheck from "./optionCheck";

const Wrapper = styled.div`
  display: flex;
  padding: 12px 16px;
  gap: 8px;
  width: 100%;

  :hover {
    background: #f0f3f8;
  }
`;

export default function DropdownOption({
  value,
  text,
  checked,
  onChecked = noop,
}) {
  return (
    <Wrapper onClick={() => onChecked(value, !checked)}>
      <OptionCheck checked={checked} />
      <span onClick={(e) => e.stopPropagation()}>{text}</span>
    </Wrapper>
  );
}

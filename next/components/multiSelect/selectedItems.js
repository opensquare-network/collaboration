import styled, { css } from "styled-components";
import { ReactComponent as DropSVG } from "./drop.svg";
import { noop } from "@osn/common-ui";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #b7c0cc;
  gap: 8px;
`;

const Text = styled.span`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #1e2134;
`;

const DropIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ showDropdown }) =>
    showDropdown &&
    css`
      transform: rotate(180deg);
    `}
`;

export default function SelectedItems({
  options,
  selectedOptions,
  showDropdown,
  setShowDropdown = noop,
}) {
  return (
    <Wrapper onClick={() => setShowDropdown(!showDropdown)}>
      <Text onClick={(e) => e.stopPropagation()}>
        {(options || [])
          .filter((op) => (selectedOptions || []).includes(op.value))
          .map((op) => op.text)
          .join(", ")}
      </Text>
      <DropIcon showDropdown={showDropdown}>
        <DropSVG />
      </DropIcon>
    </Wrapper>
  );
}

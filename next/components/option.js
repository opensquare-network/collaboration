import { Button } from "@osn/common-ui";
import styled, { css } from "styled-components";

const OptionButton = styled(Button)`
  height: auto;
  ${(p) =>
    p.$active &&
    css`
      border-color: var(--textBrandPrimary);
      color: var(--textBrandPrimary);
      &:hover {
        border-color: var(--textBrandPrimary);
      }
    `}
`;

const IndexSpan = styled.span`
  color: var(--textTertiary);
  ${(p) => p.$active && "color: var(--textBrandPrimary);"}
`;

function Option({ item, index, active, ...props }) {
  return (
    <OptionButton $active={active} block {...props}>
      <IndexSpan $active={active}>#{index}</IndexSpan>
      <div
        title={item}
        className="w-full px-2 overflow-hidden text-ellipsis sm:text-nowrap text-wrap"
      >
        {item}
      </div>
    </OptionButton>
  );
}

export default Option;

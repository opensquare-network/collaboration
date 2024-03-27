import styled from "styled-components";
import DropdownOption from "./dropdownOption";
import { noop } from "@osn/common-ui";
import { useOnClickOutside } from "@osn/common";
import { useRef } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px;

  background: var(--fillBgPrimary);

  box-shadow: var(--shadowCardDefault);
`;

export default function DropdownList({
  options,
  selectedOptions,
  onChecked = noop,
  setShowDropdown = noop,
}) {
  const ref = useRef();
  useOnClickOutside(ref, () => {
    setTimeout(() => setShowDropdown(false), 200);
  });

  return (
    <Wrapper ref={ref}>
      {(options || []).map((option) => (
        <DropdownOption
          key={option.value}
          {...option}
          checked={(selectedOptions || []).includes(option.value)}
          onChecked={onChecked}
        />
      ))}
    </Wrapper>
  );
}

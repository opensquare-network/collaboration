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

  background: #ffffff;

  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),
    0px 0.751293px 8px rgba(26, 33, 44, 0.04);
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

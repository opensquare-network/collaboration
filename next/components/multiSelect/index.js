import styled from "styled-components";
import SelectedItems from "./selectedItems";
import DropdownList from "./dropdownList";
import { useState } from "react";
import { noop } from "@osn/common-ui";
import uniq from "lodash.uniq";

const Wrapper = styled.div``;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  overflow-y: visible;
`;

export default function MultiSelect({
  options,
  selectedOptions,
  setSelectedOptions = noop,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Wrapper>
      <SelectedItems
        options={options}
        selectedOptions={selectedOptions}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
      <DropdownContainer>
        {showDropdown && (
          <DropdownList
            setShowDropdown={setShowDropdown}
            options={options}
            selectedOptions={selectedOptions}
            onChecked={(value, checked) => {
              if (checked) {
                setSelectedOptions(uniq([...selectedOptions, value]));
              } else {
                setSelectedOptions(
                  selectedOptions.filter((option) => option !== value),
                );
              }
            }}
          />
        )}
      </DropdownContainer>
    </Wrapper>
  );
}

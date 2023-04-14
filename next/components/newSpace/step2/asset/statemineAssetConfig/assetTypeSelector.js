import styled from "styled-components";
import DropdownSelector from "@osn/common-ui/es/DropdownSelector";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;

  > * {
    flex-grow: 1;
  }
`;

export default function AssetTypeSelector({ onSelect = () => {} }) {
  const [selectedIndex, setSelectedIndex] = useState("native");

  const options = [
    { key: "native", value: "native", content: "Native" },
    { key: "assets", value: "assets", content: "Assets" },
  ];

  useEffect(() => {
    onSelect(selectedIndex);
  }, [onSelect, selectedIndex]);

  return (
    <Wrapper>
      <DropdownSelector
        options={options}
        value={selectedIndex}
        onSelect={setSelectedIndex}
      />
    </Wrapper>
  );
}

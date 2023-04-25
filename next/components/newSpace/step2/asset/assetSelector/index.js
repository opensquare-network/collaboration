import { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexBetween } from "@osn/common-ui";
import DropdownSelector from "@osn/common-ui/es/DropdownSelector";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;

  > * {
    flex-grow: 1;
  }
`;

function AssetItem({ symbol }) {
  //TODO: display asset type
  return (
    <FlexBetween>
      <span>{symbol}</span>
    </FlexBetween>
  );
}

export default function AssetSelector({
  chain,
  assetTypes,
  onSelect = () => {},
}) {
  const [selectedIndex, setSelectedIndex] = useState("native");

  const options = (assetTypes || []).map((item) => ({
    key: item.value,
    value: item.value,
    content: <AssetItem symbol={item.symbol} type={item.type} />,
  }));

  useEffect(() => {
    onSelect(selectedIndex);
  }, [onSelect, selectedIndex]);

  useEffect(() => {
    setSelectedIndex("native");
  }, [chain]);

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

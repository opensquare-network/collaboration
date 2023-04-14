import { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexBetween } from "@osn/common-ui";
import { Chains } from "@osn/constants";
import DropdownSelector from "@osn/common-ui/es/DropdownSelector";
import { bifrostOrmlTokens, karuraOrmlTokens } from "../constants";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;

  > * {
    flex-grow: 1;
  }
`;

function AssetItem({ symbol, type }) {
  return (
    <FlexBetween>
      <span>{symbol}</span>
      {/* <span>{type}</span> */}
    </FlexBetween>
  );
}

export default function AssetSelector({ chain, onSelect = () => {} }) {
  const [selectedIndex, setSelectedIndex] = useState("native");

  let options = [];
  if (chain === Chains.karura) {
    options = [
      {
        key: "native",
        value: "native",
        content: <AssetItem symbol="KAR" type="Native" />,
      },
      ...karuraOrmlTokens.map((item) => ({
        key: item.symbol,
        value: item.symbol,
        content: <AssetItem symbol={item.symbol} type="ORML Asset" />,
      })),
    ];
  } else if (chain === Chains.bifrost) {
    options = [
      {
        key: "native",
        value: "native",
        content: <AssetItem symbol="BNC" type="Native" />,
      },
      ...bifrostOrmlTokens.map((item) => ({
        key: item.symbol,
        value: item.symbol,
        content: <AssetItem symbol={item.symbol} type="ORML Asset" />,
      })),
    ];
  }

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

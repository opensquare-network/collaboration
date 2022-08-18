import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { p_14_medium } from "../styles/textStyles";
import { ChainIcon } from "@osn/common-ui";
import DropdownSelector from "@osn/common-ui/es/DropdownSelector";

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const Text = styled.p`
  ${p_14_medium};
  text-transform: capitalize;
  color: #1e2134;
  margin: 0;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  & > div:first-child {
    margin-right: 16px;
  }

  ${(p) =>
    p.header &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      pointer-events: none;
    `}
  img, svg {
    margin-right: 8px;
  }
`;

const ChainItem = ({ header, chainName }) => {
  return (
    <ItemWrapper header={header}>
      <ChainIcon chainName={chainName} />
      <div>
        <Text>{chainName}</Text>
      </div>
    </ItemWrapper>
  );
};

const ChainSelector = ({ chains = [], onSelect = () => {} }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    onSelect(chains[selectedIndex]);
  }, [chains, onSelect, selectedIndex]);

  const options = chains.map((item, index) => ({
    key: index,
    value: index,
    content: <ChainItem chainName={item.network} />,
  }));

  return (
    <Wrapper>
      <DropdownSelector
        options={options}
        value={selectedIndex}
        onSelect={setSelectedIndex}
      />
    </Wrapper>
  );
};

export default ChainSelector;

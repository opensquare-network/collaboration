import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Dropdown from "@/components/styled/dropdown";
import { p_14_medium } from "../styles/textStyles";
import ChainIcon from "@/components/chain/chainIcon";

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const StyledDropdown = styled(Dropdown)`
  height: 48px !important;
`;

const Text = styled.p`
  ${p_14_medium};
  color: #1E2134;
  margin: 0;
`;

const ItemWrapper = styled.div`
  height: 48px;
  padding: 12px 16px;
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
  svg {
    margin-right: 8px;
  }
`;

const ChainItem = ({header, chainName}) => {
  return (
    <ItemWrapper header={header}>
      <ChainIcon chainName={chainName}/>
      <div>
        <Text>{chainName}</Text>
      </div>
    </ItemWrapper>
  );
};

const ChainSelector = ({
  chains=[],
                         onSelect = () => {
                         },
                       }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    onSelect(chains[selectedIndex]);
  }, [chains, onSelect, selectedIndex]);
  const options = chains.map((item, index) => ({
    key: index,
    value: index,
    content: (
      <ChainItem chainName={item.name}/>
    ),
  }));

  return (
    <Wrapper>
      <DropdownWrapper>
        <StyledDropdown
          selection
          options={options}
          onChange={(_, {value}) => {
            setSelectedIndex(value);
          }}
        />
        <ChainItem
          chainName={chains?.[selectedIndex]?.name}
          header
        />
      </DropdownWrapper>
    </Wrapper>
  );
};

export default ChainSelector;

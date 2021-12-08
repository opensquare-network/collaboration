import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";

import AccountItem from "./accountItem";
import { p_14_normal } from "../styles/textStyles";

const Wrapper = styled.div``;

const DropdownWrapper = styled.div`
  position: relative;
`;

const StyledDropdown = styled(Dropdown)`
  width: 100%;
  height: 64px !important;
  border-radius: 0 !important;
  :active,
  :hover,
  :focus {
    border-color: #cccccc !important;
  }
  &.active,
  & .menu {
    border-color: #cccccc !important;
  }
  &.ui.dropdown .menu > .item {
    padding: 0 !important;
  }
  .icon {
    top: 50% !important;
    transform: translate(0, -9px) !important;
    opacity: 0.24 !important;
  }
`;

const AccountSelector = ({ accounts, onSelect = () => {} }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    onSelect(accounts[selectedIndex]);
  }, [accounts, onSelect, selectedIndex]);
  const options = accounts.map((item, index) => ({
    key: index,
    value: index,
    content: (
      <AccountItem accountName={item.name} accountAddress={item.address} />
    ),
  }));
  return (
    <Wrapper>
      <DropdownWrapper>
        <StyledDropdown
          selection
          options={options}
          onChange={(_, { value }) => {
            setSelectedIndex(value);
          }}
        />
        <AccountItem
          accountName={accounts?.[selectedIndex]?.name}
          accountAddress={accounts?.[selectedIndex]?.address}
          header
        />
      </DropdownWrapper>
    </Wrapper>
  );
};

export default AccountSelector;

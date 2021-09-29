import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";

import AccountItem from "./accountItem";

const Wrapper = styled.div`
  /* margin-bottom: 24px; */
`;

const Text = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #1D253C;
  margin: 0;
`;

const Label = styled(Text)`
  font-weight: 500;
  margin-bottom: 8px;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const StyledDropdown = styled(Dropdown)`
  width: 100%;
  height: 64px !important;
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
      <AccountItem
        accountName={item.name}
        accountAddress={item.address}
      />
    ),
  }));
  return (
    <Wrapper>
      <Label>Choose linked account</Label>
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
          accountAddress={
            accounts?.[selectedIndex]?.address
          }
          header
        />
      </DropdownWrapper>
    </Wrapper>
  );
};

export default AccountSelector;

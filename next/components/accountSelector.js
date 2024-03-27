import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountItem from "./accountItem";
import { DropdownSelector } from "@osn/common-ui";

const Wrapper = styled.div``;

const DropdownWrapper = styled.div`
  position: relative;
  height: 64px;
`;

const AccountSelector = ({ accounts, chain, onSelect = () => {} }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    onSelect(accounts[selectedIndex]);
  }, [accounts, onSelect, selectedIndex]);

  const options = accounts.map((item, index) => ({
    key: index,
    value: index,
    content: (
      <AccountItem
        accountName={item?.meta?.name}
        accountAddress={item.address}
        chain={chain.network}
      />
    ),
  }));

  return (
    <Wrapper>
      <DropdownWrapper>
        <DropdownSelector
          className="!h-16"
          options={options}
          value={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </DropdownWrapper>
    </Wrapper>
  );
};

export default AccountSelector;

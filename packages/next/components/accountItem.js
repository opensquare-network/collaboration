import React from "react";
import styled, { css } from "styled-components";

import Avatar from "./avatar";
import Address from "./address";
import { p_14_normal, p_16_semibold } from "../styles/textStyles";
import encodeAddressByChain from "../frontedUtils/chain/addr";

const Text = styled.p`
  ${p_16_semibold};
  color: #1e2134;
  margin: 0;
`;

const TextMinor = styled(Text)`
  ${p_14_normal};
  color: #9da9bb;
`;

const ItemWrapper = styled.div`
  height: 64px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  & > div:first-child {
    margin-right: 16px;
  }
  & > span:first-child {
    margin-right: 16px;
  }
  ${(p) =>
    p.header &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      pointer-events: none;
    `}
`;

const AccountItem = ({ header, accountName, accountAddress, chain }) => {
  const address = encodeAddressByChain(accountAddress, chain);

  return (
    <ItemWrapper header={header}>
      <Avatar address={accountAddress} size={40} />
      <div>
        <Text>{accountName}</Text>
        <TextMinor>
          <Address>{address}</Address>
        </TextMinor>
      </div>
    </ItemWrapper>
  );
};

export default AccountItem;

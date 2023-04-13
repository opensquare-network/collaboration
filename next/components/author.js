import styled from "styled-components";

import Avatar from "./avatar";
import { ChainIcon } from "@osn/common-ui";
import IdentityOrAddr from "@/components/identityOrAddr";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #2e343d;
  > :not(:first-child) {
    margin-left: 4px;
  }
  > :first-child {
    margin-right: 4px;
  }
`;

export default function Author({
  address,
  space,
  size = 20,
  showNetwork = false,
  noLink,
}) {
  const { network } = space || {};

  return (
    <Wrapper noLink={noLink}>
      <Avatar address={address} size={size} />
      {showNetwork && (
        <ChainIcon showTooltip chainName={space?.network} size={16} />
      )}
      <IdentityOrAddr network={network} address={address} noLink={noLink} />
    </Wrapper>
  );
}

import styled from "styled-components";

import Avatar from "./avatar";
import { ChainIcon } from "components/chainIcon";
import IdentityOrAddr from "@/components/identityOrAddr";
import { getCollectiveMenberIdentityLink } from "frontedUtils/space";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--textPrimary);
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
  isCollective = false,
}) {
  const { network: spaceNetwork } = space || {};
  const network = !isCollective ? spaceNetwork : space?.network ?? "polkadot";

  return (
    <Wrapper noLink={noLink}>
      <Avatar address={address} size={size} />
      {showNetwork && (
        <ChainIcon showTooltip chainName={space?.network} size={16} />
      )}
      <IdentityOrAddr
        network={network}
        address={address}
        noLink={noLink}
        href={
          isCollective ? getCollectiveMenberIdentityLink(address, network) : ""
        }
      />
    </Wrapper>
  );
}

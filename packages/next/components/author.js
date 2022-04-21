import styled from "styled-components";
import { useEffect, useState } from "react";

import { addressEllipsis } from "frontedUtils";
import Avatar from "./avatar";
import { fetchIdentity } from "services/identity";
import ExternalLink from "@osn/common-ui/dist/ExternalLink";
import IdentityIcon from "components/identityIcon";
import { useIsMounted } from "frontedUtils/hooks";
import { getExplorer } from "../frontedUtils";
import ChainIcon from "@/components/chain/chainIcon";
import { CHAINS, evmChains } from "../frontedUtils/consts/chains";

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

const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const IdentityWrapper = styled.div`
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 4px;
  }
`;

export default function Author({
  address,
  space = {},
  size = 20,
  showNetwork = false,
}) {
  const [identity, setIdentity] = useState();
  const isMounted = useIsMounted();
  const explorer = getExplorer(space?.network);
  const { network } = space;
  let link = `https://${network}.${explorer}.io/account/${address}`;
  if (CHAINS.moonriver === network) {
    link = `https://moonriver.moonscan.io/address/${address}`;
  }
  const isEvm = evmChains.includes(space?.network);

  useEffect(() => {
    if (!address || !network || isEvm) {
      return;
    }

    fetchIdentity(network, address)
      .then((identity) => {
        if (isMounted.current) {
          setIdentity(identity);
        }
      })
      .catch(() => {});
  }, [network, address, isMounted, isEvm]);

  return (
    <Wrapper>
      <Avatar address={address} size={size} />
      {showNetwork && (
        <ChainIcon showTooltip chainName={space?.network} size={16} />
      )}
      <ExternalLink href={link}>
        {identity?.info && identity?.info?.status !== "NO_ID" ? (
          <IdentityWrapper>
            <IdentityIcon
              status={identity.info.status}
              showTooltip
              size={showNetwork ? 12 : 14}
            />
            <Name>{identity.info.display}</Name>
          </IdentityWrapper>
        ) : (
          <Name>{addressEllipsis(address)}</Name>
        )}
      </ExternalLink>
    </Wrapper>
  );
}

import styled from "styled-components";
import { useState, useEffect } from "react";

import { addressEllipsis } from "frontedUtils";
import Avatar from "./avatar";
import { fetchIdentity } from "services/identity";
import ExternalLink from "./externalLink";
import IdentityIcon from "components/identityIcon";
import { useIsMounted } from "frontedUtils/hooks";
import { encodeAddress } from "@polkadot/util-crypto";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #2e343d;
  > :not(:first-child) {
    margin-left: 8px;
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

export default function Author({ address, space, size = 20 }) {
  const [identity, setIdentity] = useState();
  const isMounted = useIsMounted();
  const chain = space?.identity || space;

  useEffect(() => {
    if (!address) {
      return;
    }

    if (!chain) {
      return;
    }

    const idenAddr = encodeAddress(address, chain.ss58Format);
    fetchIdentity(chain.network, idenAddr)
      .then((identity) => {
        if (isMounted.current) {
          setIdentity(identity);
        }
      })
      .catch(() => {});
  }, [chain, address, isMounted]);

  return (
    <Wrapper>
      <Avatar address={address} size={size} />
      <ExternalLink
        href={`https://${space?.network}.subscan.io/account/${address}`}
      >
        {identity?.info && identity?.info?.status !== "NO_ID" ? (
          <IdentityWrapper>
            <IdentityIcon status={identity.info.status} showTooltip />
            <Name>{identity.info.display}</Name>
          </IdentityWrapper>
        ) : (
          <Name>{addressEllipsis(address)}</Name>
        )}
      </ExternalLink>
    </Wrapper>
  );
}

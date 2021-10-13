import styled from "styled-components";
import { useState, useEffect } from "react";

import { addressEllipsis } from "utils";
import Avatar from "./avatar";
import { fetchIdentity } from "services/identity";
import ExternalLink from "./externalLink";
import IdentityIcon from "components/identityIcon";
import { useIsMounted } from "utils/hooks";

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

export default function Author({ address, network, size = 24 }) {
  const [identity, setIdentity] = useState();
  const isMounted = useIsMounted();

  useEffect(() => {
    fetchIdentity(network, address)
      .then((identity) => {
        if (isMounted.current) {
          setIdentity(identity);
        }
      })
      .catch(() => {});
  }, [network, address, isMounted]);

  return (
    <Wrapper>
      <Avatar address={address} size={size} />
      <ExternalLink href={`https://${network}.subscan.io/account/${address}`}>
        {identity?.info ? (
          <IdentityWrapper>
            <IdentityIcon status={identity.info.status} />
            <Name>{identity.info.display}</Name>
          </IdentityWrapper>
        ) : (
          <Name>{addressEllipsis(address)}</Name>
        )}
      </ExternalLink>
    </Wrapper>
  );
}

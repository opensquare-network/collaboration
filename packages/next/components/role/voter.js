import { useEffect, useState } from "react";
import { useIsMounted } from "../../frontedUtils/hooks";
import { addressEllipsis, getExplorer } from "../../frontedUtils";
import { fetchIdentity } from "../../services/identity";
import encodeAddressByChain from "../../frontedUtils/chain/addr";
import Avatar from "@/components/avatar";
import ExternalLink from "@/components/externalLink";
import IdentityIcon from "@/components/identityIcon";
import styled from "styled-components";
import NetworkLogo from "@/components/role/networkLogo";
import ChainIcon from "@/components/chain/chainIcon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #2e343d;

  > :not(:first-child) {
    margin-left: 4px;
  }
  .ui--IdentityIcon svg:first-child {
    margin-right: 4px;
  }
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const IdentityWrapper = styled.span`
  display: inline-flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 4px;
  }
`;

export default function Voter({ address, network, showNetwork = true }) {
  const [identity, setIdentity] = useState();
  const isMounted = useIsMounted();
  const explorer = getExplorer(network);
  const link = `https://${network}.${explorer}.io/account/${address}`;

  useEffect(() => {
    if (!address || !network) {
      return;
    }

    const networkAddress = encodeAddressByChain(address, network);
    fetchIdentity(network, networkAddress)
      .then((identity) => {
        if (isMounted.current) {
          setIdentity(identity);
        }
      })
      .catch(() => {});
  }, [network, address, isMounted]);

  return (
    <Wrapper>
      <Avatar address={address} size={20} />
      {showNetwork && <ChainIcon chainName={network} size={16} />}
      <ExternalLink href={link}>
        {showNetwork && <NetworkLogo network={network} />}
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

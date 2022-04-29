import { useEffect, useState } from "react";
import { useIsMounted } from "../../frontedUtils/hooks";
import { getExplorer } from "../../frontedUtils";
import { fetchIdentity } from "../../services/identity";
import encodeAddressByChain from "../../frontedUtils/chain/addr";
import Avatar from "@/components/avatar";
import ExternalLink from "@osn/common-ui/es/ExternalLink";
import styled from "styled-components";
import { ChainIcon } from "@osn/common-ui";
import { evmChains } from "../../frontedUtils/consts/chains";
import Popup from "@/components/popup";
import IdentityOrAddr from "@/components/identityOrAddr";

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

const TextMinor = styled.span`
  color: #506176;
  word-break: break-all;
`;

const PopupCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 288px;
  color: #1e2134;
  > div:first-child {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const Divider = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  height: 1px;
  width: 100%;
  background-color: #f0f3f8;
`;

export default function Voter({ address, network, showNetwork = true }) {
  const [identity, setIdentity] = useState();
  const isMounted = useIsMounted();
  const explorer = getExplorer(network);
  const link = `https://${network}.${explorer}.io/account/${address}`;

  const isEvm = evmChains.includes(network);

  useEffect(() => {
    if (!address || !network || isEvm) {
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
  }, [network, address, isMounted, isEvm]);

  const popup = (
    <PopupCard>
      <div>
        <Avatar address={address} size={20} />
        <ChainIcon chainName={network} size={16} />
        <IdentityOrAddr identity={identity} addr={address} showNetwork={showNetwork}/>
      </div>
      <Divider />
      <TextMinor>{address}</TextMinor>
    </PopupCard>
  );

  return (
    <Wrapper>
      <Avatar address={address} size={20} />
      {showNetwork && <ChainIcon chainName={network} size={16} />}
      <Popup content={popup}>
        <ExternalLink href={link}>
          <IdentityOrAddr identity={identity} addr={address} showNetwork={showNetwork} ellipsis/>
        </ExternalLink>
      </Popup>
    </Wrapper>
  );
}

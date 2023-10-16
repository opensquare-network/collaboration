import styled, { css } from "styled-components";
import IdentityIcon from "@osn/common-ui/es/User/IdentityIcon";
import { addressEllipsis, getExplorer } from "../frontedUtils";
import { useIsMounted } from "frontedUtils/hooks";
import { evm, evmChains, getChainConfigs } from "../frontedUtils/consts/chains";
import { fetchIdentity } from "services/identity";
import { useEffect, useState } from "react";
import { ExternalLink } from "@osn/common-ui";
import encodeAddressByChain from "frontedUtils/chain/addr";

const IdentityWrapper = styled.span`
  display: inline-flex;
  align-items: start;

  > span:first-child {
    height: 24px;
  }

  > :not(:first-child) {
    margin-left: 4px;
  }

  ${(p) =>
    p.ellipsis &&
    css`
      > span:last-child {
        word-break: break-all;
      }
    `}
  ${(p) =>
    p.noLink &&
    css`
      pointer-events: none;
    `}
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

export default function IdentityOrAddr({
  noLink = false,
  network,
  address,
  iconSize = 12,
  ellipsis = false,
  isSafari = false,
}) {
  const [identity, setIdentity] = useState();
  const isMounted = useIsMounted();
  const explorer = getExplorer(network);

  const isLink = !noLink;

  let link = `https://${network}.${explorer}.io/account/${address}`;
  if (evm.moonriver === network) {
    link = `https://moonriver.moonscan.io/address/${address}`;
  } else if (evm.moonbeam === network) {
    link = `https://moonscan.io/address/${address}`;
  } else if ("creditcoin" === network) {
    link = `https://explorer.creditcoin.org/Account/RecentExtrinsics/${address}`;
  }

  const isEvm = evmChains.includes(network);

  useEffect(() => {
    if (!address || !network || isEvm) {
      return;
    }

    const chainConfig = getChainConfigs(network);
    const identityNetwork = chainConfig?.identity || network;
    const identityAddr = encodeAddressByChain(address, identityNetwork);

    fetchIdentity(identityNetwork, identityAddr)
      .then((identity) => {
        if (isMounted.current) {
          setIdentity(identity);
        }
      })
      .catch(() => {});
  }, [network, address, isMounted, isEvm]);

  let identityChild =
    identity?.info && identity?.info?.status !== "NO_ID" ? (
      <IdentityWrapper ellipsis={ellipsis}>
        <IdentityIcon
          status={identity?.info?.status}
          showTooltip={!isSafari}
          size={iconSize}
        />
        <Name title={identity?.info?.display}>{identity?.info?.display}</Name>
      </IdentityWrapper>
    ) : (
      <Name>{addressEllipsis(address)}</Name>
    );

  if (isLink) {
    identityChild = <ExternalLink href={link}>{identityChild}</ExternalLink>;
  }

  return identityChild;
}

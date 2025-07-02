import styled from "styled-components";
import Identicon from "@osn/polkadot-react-identicon";
import { ethers } from "ethers";
import makeBlockie from "ethereum-blockies-base64";
import { Tooltip } from "@osn/common-ui";
import React from "react";
import IdentityOrAddr from "./identityOrAddr";
import useAvatarInfo from "hooks/useAvatar";
import IpfsAvatar from "./ipfsAvatar";
import { getCollectiveMenberIdentityLink } from "frontedUtils/space";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: var(--fillBgTertiary); ;
`;

const ImgWrapper = styled.img`
  border-radius: ${(props) => props.size / 2}px;
`;

export default function Avatar({ address, size = 20 }) {
  const [avatarCid] = useAvatarInfo(address);
  const normalizedSize = isNaN(size) ? size : `${size}px`;

  if (avatarCid) {
    return <IpfsAvatar avatarCid={avatarCid} size={normalizedSize} />;
  }
  if (ethers.utils.isAddress(address)) {
    const imgSize = (size / 10) * 8;

    return (
      <Wrapper size={size}>
        <ImgWrapper
          size={imgSize}
          src={makeBlockie(address)}
          width={imgSize}
          height={imgSize}
          alt={address}
        />
      </Wrapper>
    );
  }

  return <Identicon value={address} size={size} />;
}

export function AvatarWithTooltip({
  address,
  size = 20,
  network,
  isCollective = false,
}) {
  return (
    <Tooltip
      content={
        <IdentityOrAddr
          address={address}
          network={network}
          href={isCollective ? getCollectiveMenberIdentityLink(address) : ""}
        />
      }
    >
      <div>
        <Avatar address={address} size={size} />
      </div>
    </Tooltip>
  );
}

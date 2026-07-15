import styled from "styled-components";
import getStorageLink from "frontedUtils/env/storageLink";

const IpfsAvatarWrapper = styled.img`
  border-radius: 50%;
  width: ${(p) => p.size};
  height: ${(p) => p.size};
  min-width: ${(p) => p.size};
  min-height: ${(p) => p.size};
  object-fit: cover;
`;

export default function IpfsAvatar({ avatarCid, size }) {
  if (!avatarCid) {
    return null;
  }

  return (
    <IpfsAvatarWrapper
      src={getStorageLink(avatarCid)}
      alt="avatar"
      size={size}
    />
  );
}

import styled from "styled-components";

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
      src={`${process.env.NEXT_PUBLIC_IPFS_ENDPOINT}${avatarCid}`}
      alt="avatar"
      size={size}
    />
  );
}

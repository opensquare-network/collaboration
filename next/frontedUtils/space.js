import * as isIPFS from "is-ipfs";

function isCid(cid) {
  return isIPFS.cid(cid) || isIPFS.base32cid(cid?.toLowerCase());
}

export function getSpaceIconUrl(space) {
  const spaceIcon = space?.spaceIcon;

  const isIconCid = isCid(spaceIcon);
  if (!isIconCid) {
    return `/imgs/icons/space/${spaceIcon}`;
  }

  return `${process.env.NEXT_PUBLIC_IPFS_ENDPOINT}${spaceIcon}`;
}

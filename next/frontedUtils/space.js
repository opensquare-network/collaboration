export function getSpaceIconUrl(space) {
  const spaceIcon = space?.spaceIcon;

  const notCid = spaceIcon?.includes(".");
  if (notCid) {
    return `/imgs/icons/space/${spaceIcon}`;
  }

  return `${process.env.NEXT_PUBLIC_IPFS_ENDPOINT}${spaceIcon}`;
}

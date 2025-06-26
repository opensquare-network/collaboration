import { getDefaultLogoUri } from "hooks/useDefaultLogo";
import { useMemo } from "react";

export const isCollectiveSpace = (type) => type === "collectives-dao";

export function getSpaceIconUri(space) {
  if (!space) {
    return null;
  }

  const spaceIcon = space.spaceIcon;

  if (!spaceIcon) {
    return getDefaultLogoUri(space.name, 50, 50);
  }

  const notCid = spaceIcon?.includes(".");
  if (notCid) {
    return `/imgs/icons/space/${spaceIcon}`;
  }

  return `${process.env.NEXT_PUBLIC_IPFS_ENDPOINT}${spaceIcon}`;
}

export function useSpaceIconUri(space) {
  return useMemo(() => getSpaceIconUri(space), [space]);
}

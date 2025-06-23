import { getDefaultLogoUri } from "hooks/useDefaultLogo";
import { useMemo } from "react";

export function getSpaceIconUrl(space) {
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
  return useMemo(() => getSpaceIconUrl(space), [space]);
}

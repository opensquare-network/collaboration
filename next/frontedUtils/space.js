import { getDefaultLogoUri } from "hooks/useDefaultLogo";
import { useMemo } from "react";
import pick from "lodash-es/pick";

export const isCollectiveSpace = (type) => type === "collectives-dao";

export const getCollectiveSpaceNetwork = (networks) =>
  networks?.filter((item) => ["polkadot", "ethereum"].includes(item.network)) ||
  [];

export const getSpaceNetwork = (space, networks) => {
  if (!space) {
    return [];
  }

  if (isCollectiveSpace(space?.type)) {
    return getCollectiveSpaceNetwork(networks);
  }

  return (
    space?.networks?.map((item) => pick(item, ["network", "ss58Format"])) || []
  );
};

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

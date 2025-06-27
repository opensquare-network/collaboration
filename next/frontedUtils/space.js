import { getDefaultLogoUri } from "hooks/useDefaultLogo";
import { useMemo } from "react";

export const isCollectiveSpace = (type) => type === "collectives-dao";

export const COLLECTIVE_SPACE_NETWORK = [
  {
    network: "ethereum",
    ss58Format: null,
    assets: [
      {
        symbol: "ETH",
        decimals: 18,
        votingThreshold: "1000000000000000000",
        multiplier: 1,
      },
    ],
  },
  {
    network: "polkadot",
    ss58Format: 0,
    assets: [
      {
        symbol: "DOT",
        decimals: 10,
        votingThreshold: "0",
        multiplier: 1,
      },
    ],
  },
];

export const getSpaceNetwork = (space) => {
  if (!space) {
    return [];
  }

  if (isCollectiveSpace(space?.type)) {
    return COLLECTIVE_SPACE_NETWORK;
  }

  return space?.networks;
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

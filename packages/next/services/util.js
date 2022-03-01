export function getNetworkIdentity(network) {
  switch (network) {
    case "polkadot": {
      return {
        network: "polkadot",
        ss58Format: 0,
      };
    }
    case "kusama": {
      return {
        network: "kusama",
        ss58Format: 2,
      };
    }
    default: {
      return undefined;
    }
  }
}

export const findNetworkConfig = (space, network) => {
  const networkConfig = space?.networks?.find(item => item.network === network);
  if (!networkConfig) {
    return null;
  }

  return {
    ...networkConfig,
    symbol: space?.symbol,
    decimals: space?.decimals,
    identity: getNetworkIdentity(networkConfig.identity),
  }
};

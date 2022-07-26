export const findNetworkConfig = (space, network) => {
  const networkConfig = space?.networks?.find(
    (item) => item.network === network
  );
  if (!networkConfig) {
    return null;
  }

  return {
    symbol: space?.symbol,
    networks: space.networks,
    ...networkConfig,
    decimals: space?.decimals,
  };
};

export const findNetworkConfig = (space, network) => {
  const networkConfig = space?.networks?.find(
    (item) => item.network === network
  );
  if (!networkConfig) {
    return null;
  }

  return {
    symbol: space?.symbol,
    decimals: space?.decimals,
    networks: space.networks,
    ...networkConfig,
  };
};

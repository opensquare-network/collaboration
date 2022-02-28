export const findNetworkConfig = (space, network) => {
  const networkConfig = space?.networks?.find(item => item.network === network);
  if (!networkConfig) {
    return null;
  }

  return {
    ...networkConfig,
    symbol: space?.symbol,
    decimals: space?.decimals,
  }
};
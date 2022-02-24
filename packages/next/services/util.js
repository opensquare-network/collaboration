export const findNetworkConfig = (space, network) => {
  const networkConfig = space?.networks?.find(item => item.network === network);
  return {
    ...networkConfig,
    symbol: space?.symbol,
    decimals: space?.decimals,
  }
};

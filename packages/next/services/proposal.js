export const findNetworkConfig = (proposal, network) => {
  const networkConfig = proposal.networksConfig?.networks?.find(item => item.network === network);
  return {
    ...networkConfig,
    symbol: proposal.networksConfig?.symbol,
    decimals: proposal.networksConfig?.decimals,
  }
};

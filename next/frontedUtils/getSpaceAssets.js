export function getSpaceAssets(space) {
  const assets = [];

  for (const network of space.networks) {
    for (const asset of network.assets) {
      const symbol = asset?.symbol ?? space?.symbol;
      const multiplier = asset?.multiplier;
      const networkName = network?.network;
      const delegation = asset?.delegation;
      assets.push({
        network: networkName,
        symbol,
        multiplier,
        delegation,
      });
    }
  }

  return assets;
}

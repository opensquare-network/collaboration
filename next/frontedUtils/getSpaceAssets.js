export function getSpaceAssets(space) {
  const assets = [];

  for (const network of space.networks) {
    if (network.assets?.length > 0) {
      for (const asset of network.assets) {
        const symbol = asset?.symbol ?? network?.symbol ?? space?.symbol;
        const assetName = asset?.assetName;
        const multiplier = asset?.multiplier ?? network?.multiplier;
        const networkName = network?.network ?? space?.network;
        const delegation = asset?.delegation;
        assets.push({
          network: networkName,
          symbol,
          assetName,
          multiplier,
          delegation,
        });
      }
    } else {
      const symbol = network?.symbol ?? space?.symbol;
      const multiplier = network?.multiplier;
      const networkName = network?.network ?? space?.network;
      const delegation = network?.delegation;
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

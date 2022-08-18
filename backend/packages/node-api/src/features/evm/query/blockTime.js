const { getProviders } = require("../providers");

async function getBlockTimeByHeightFromProvider(provider, expectedHeight) {
  const block = await provider.getBlock(expectedHeight, false);
  return block.timestamp * 1000;
}

async function getBlockTimeByHeight(network, expectedHeight) {
  const providers = getProviders(network);
  return Promise.any(
    providers.map((provider) =>
      getBlockTimeByHeightFromProvider(provider, expectedHeight)
    )
  );
}

module.exports = {
  getBlockTimeByHeight,
};

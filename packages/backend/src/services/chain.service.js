const { timeout } = require("../utils");
const { getChainHeight } = require("./node.service");

let latestHeights = {};

async function updateChainHeight(network) {
  try {
    await Promise.race([
      getChainHeight(network).then(({ height }) => {
        latestHeights[network] = { height, updateTime: Date.now() };
      }),
      timeout(2000),
    ]);
  } catch (e) {
    console.error(`Can not update ${network} height: ${e.message}`);
  }
}

async function getLatestHeight(networkName) {
  if (
    !latestHeights[networkName] ||
    latestHeights[networkName].updateTime < Date.now() - 12 * 1000
  ) {
    await updateChainHeight(networkName);
  }

  return latestHeights[networkName]?.height;
}

module.exports = {
  getLatestHeight,
};

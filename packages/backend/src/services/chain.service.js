const { getChainHeight } = require("./node.service");

let latestHeights = {};

async function updateChainHeight(network) {
  try {
    const { height } = await getChainHeight(network);
    latestHeights[network] = { height, updateTime: Date.now() };
  } catch (e) {
    console.error(`can not update ${network} height`);
  }
}

async function getLatestHeight(networkName) {
  if (!latestHeights[networkName]) {
    await updateChainHeight(networkName);
  } else if (latestHeights[networkName].updateTime < Date.now() - 12 * 1000) {
    await updateChainHeight(networkName);
  }

  return latestHeights[networkName]?.height;
}

module.exports = {
  getLatestHeight,
};

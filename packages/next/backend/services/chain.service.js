const { getApi } = require("./node.service");
const { spaces: spaceServices } = require("../spaces");
const { getFinalizedHeight } = require("./node.service");

let latestHeights = {};
let timer = null;

function startUpdateHeight() {
  const doUpdate = () => {
    const networkNames = new Set();
    Object.keys(spaceServices).forEach(async (spaceName) => {
      const spaceService = spaceServices[spaceName];
      spaceService.networks?.forEach(async (network) => {
        networkNames.add(network.network);
      });
    });
    networkNames.forEach(async (networkName) => {
      try {
        const api = await getApi(networkName);
        const { height } = await getFinalizedHeight(api);
        latestHeights[networkName] = height;
      } catch (e) {
        // ignore
      }
    });
  };

  doUpdate();
  timer = setInterval(doUpdate, 12 * 1000);
}

function stopUpdateHeight() {
  clearInterval(timer);
  timer = null;
}

function getLatestHeight(networkName) {
  return latestHeights[networkName];
}

module.exports = {
  startUpdateHeight,
  stopUpdateHeight,
  getLatestHeight,
};

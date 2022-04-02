const { getAllSpaces } = require("../spaces");
const { getChainHeight } = require("./node.service");
const flatten = require("lodash.flatten");

let latestHeights = {};
let timer = null;

async function updateChainHeight(network) {
  try {
    const { height } = await getChainHeight(network);
    latestHeights[network] = height;
  } catch (e) {
    console.error(`can not update ${network} height`);
  }
}

async function doUpdate() {
  const spaces = getAllSpaces();
  const networks = flatten(spaces.map((space) => space.networks));
  const networkNameSet = new Set(networks.map((network) => network.network));

  let promises = [];
  for (const network of networkNameSet) {
    promises.push(updateChainHeight(network));
  }

  await Promise.all(promises);
}

function startUpdateHeight() {
  doUpdate().then(() => {
    console.log("Chain heights initialized");
  });

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

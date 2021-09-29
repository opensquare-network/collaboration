const spaceServices = require("../spaces");

let latestHeights = {};
let unsubscribeNewHeads = {};

async function startUpdateHeight() {
  await Promise.all(
    Object.keys(spaceServices).map(async (space) => {
      const api = await spaceServices[space].getApi();
      unsubscribeNewHeads[space] = await api.rpc.chain.subscribeFinalizedHeads((header) => {
        latestHeights[space] = header.number.toNumber();
      });
    })
  );
}

function getLatestHeight(chain) {
  return latestHeights[chain];
}

function getUnSubscribeNewHeadFunction(chain) {
  return unsubscribeNewHeads[chain];
}

module.exports = {
  getUnSubscribeNewHeadFunction,
  startUpdateHeight,
  getLatestHeight,
};

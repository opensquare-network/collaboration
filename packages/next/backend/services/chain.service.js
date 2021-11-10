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

function getLatestHeight(space) {
  return latestHeights[space];
}

function getUnSubscribeNewHeadFunction(space) {
  return unsubscribeNewHeads[space];
}

module.exports = {
  getUnSubscribeNewHeadFunction,
  startUpdateHeight,
  getLatestHeight,
};

const { getApi } = require("./polkadotApi");
const { SPACES } = require("../constants");

let latestHeights = {};
let unsubscribeNewHeads = {};

async function startUpdateHeight() {
  await Promise.all(
    SPACES.map(async (space) => {
      const api = await getApi(space);
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

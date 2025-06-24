const { getChainHeight } = require("../../services/node.service");
const { spaces: spaceMap } = require("../../spaces");

async function getChainHeightByTime(chain, time) {
  const heightTime = await getChainHeight(chain, time); // { height: xxx, time: yyyy }
  return {
    [chain]: heightTime,
  };
}

async function getNetworkHeights(ctx) {
  const { space } = ctx.params;
  const { time } = ctx.query;

  const spaceConfig = spaceMap[space];
  if (!spaceConfig) {
    ctx.throw(400, "Invalid space");
    return;
  }

  const promises = [];
  for (const { network } of spaceConfig.networks || []) {
    promises.push(getChainHeightByTime(network, time));
  }

  const chainHeights = await Promise.all(promises);
  ctx.body = chainHeights.reduce(
    (result, item) => ({ ...result, ...item }),
    {},
  );
}

module.exports = {
  getNetworkHeights,
};

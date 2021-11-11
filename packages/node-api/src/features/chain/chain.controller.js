const { getApis } = require("../../apis");

async function getHeightFromOneApi(api) {
  const blockHash = await api.rpc.chain.getFinalizedHead();
  const block = await api.rpc.chain.getBlock(blockHash);
  return block.block.header.number.toNumber();
}

async function getHeightFromApis(apis) {
  const promises = [];
  for (const api of apis) {
    promises.push(getHeightFromOneApi(api));
  }

  return Promise.race(promises);
}

class ChainController {
  async getFinalizedHeight(ctx) {
    const { chain } = ctx.params;
    const apis = getApis(chain);
    if (apis.every(api => !api.isConnected)) {
      ctx.throw(500, "No apis connected")
      return
    }

    try {
      const height = await getHeightFromApis(apis);
      ctx.body = { height }
    } catch (e) {
      console.error('Get height from node fail', e)
      ctx.throw(500, "Failed to query height from node")
    }
  }
}

module.exports = new ChainController();

const { getApis } = require("../../apis");
const isNil = require("lodash.isnil");
const { getHeightByTime } = require("./queryHeight");
const { getFinalizedHeightFromApis } = require("./finalized");

class ChainController {
  async getFinalizedHeight(ctx) {
    const { chain } = ctx.params;
    const apis = getApis(chain);
    if (apis.every(api => !api.isConnected)) {
      ctx.throw(500, "No apis connected")
      return
    }

    try {
      const heightTime = await getFinalizedHeightFromApis(apis);
      ctx.body = heightTime;
    } catch (e) {
      console.error('Get height from node fail', e)
      ctx.throw(500, "Failed to query height from node")
    }
  }

  async getHeight(ctx) {
    const { chain } = ctx.params;
    const { time } = ctx.query;

    const apis = getApis(chain);
    if (apis.every(api => !api.isConnected)) {
      ctx.throw(500, "No apis connected")
      return
    }

    const finalizedHeightTime = await getFinalizedHeightFromApis(apis);
    if (isNil(time)) {
      ctx.body = finalizedHeightTime;
      return
    }

    ctx.body = await getHeightByTime(chain, apis, time, finalizedHeightTime);
  }
}

module.exports = new ChainController();

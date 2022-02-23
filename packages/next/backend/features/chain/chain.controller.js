const { getApi, getFinalizedHeightFromTime }= require("../../services/node.service");

async function getHeight(ctx) {
  const { chain } = ctx.params;
  const { time } = ctx.query;
  const api = await getApi(chain);
  const result = await getFinalizedHeightFromTime(api, time);
  ctx.body = result;
}

module.exports = {
  getHeight,
}

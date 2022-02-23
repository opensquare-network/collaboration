const spaceService = require("../../services/space.service");

async function getNetworkHeights(ctx) {
  const { space } = ctx.params;
  const { time } = ctx.query;

  const result = await spaceService.getSpaceNetworkHeights(space, time);

  ctx.body = result;
}

module.exports = {
  getNetworkHeights,
}

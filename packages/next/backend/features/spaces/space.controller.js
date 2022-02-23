const spaceService = require("../../services/space.service");

async function getSpaces(ctx) {
  ctx.body = await spaceService.getSpaces();
}

async function getSpace(ctx) {
  const { space } = ctx.params;
  ctx.body = await spaceService.getSpace(space);
}

async function getNetworkHeights(ctx) {
  const { space } = ctx.params;
  const { time } = ctx.query;

  const result = await spaceService.getSpaceNetworkHeights(space, time);

  ctx.body = result;
}

module.exports = {
  getSpace,
  getSpaces,
  getNetworkHeights,
}

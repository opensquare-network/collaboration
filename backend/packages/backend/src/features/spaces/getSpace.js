const spaceService = require("../../services/space.service");

async function getSpace(ctx) {
  const { space } = ctx.params;
  ctx.body = await spaceService.getSpace(space);
}

module.exports = {
  getSpace,
};

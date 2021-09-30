const spaceServices = require("../../spaces");

const SPACES = Object.keys(spaceServices).reduce((spaces, space) => {
  const spaceService = spaceServices[space];
  spaces[space] = {
    symbol: spaceService.symbol,
    network: spaceService.network,
    ss58Format: spaceService.ss58Format,
    decimals: spaceService.decimals,
    proposeThreshold: spaceService.proposeThreshold,
    weightStrategy: spaceService.weightStrategy,
  };
  return spaces;
}, {});

async function getSpaces(ctx) {
  ctx.body = SPACES;
}

async function getSpace(ctx) {
  const { space } = ctx.params;
  ctx.body = SPACES[space];
}

module.exports = {
  getSpace,
  getSpaces,
}

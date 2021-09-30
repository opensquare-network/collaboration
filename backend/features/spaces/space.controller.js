const spaceServices = require("../../spaces");

const SPACES = Object.keys(spaceServices).map(space => {
  const spaceService = spaceServices[space];
  return {
    [space]: {
      symbol: spaceService.symbol,
      network: spaceService.network,
      ss58Format: spaceService.ss58Format,
      decimals: spaceService.decimals,
      proposeThreshold: spaceService.proposeThreshold,
      weightStrategie: spaceService.weightStrategie,
    }
  };
});

async function getSpaces(ctx) {
  ctx.body = SPACES;
}

module.exports = {
  getSpaces,
}

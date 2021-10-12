const { getLatestHeight } = require("../../services/chain.service");
const spaceServices = require("../../spaces");
const { getBlockHash } = require("../../utils/polkadotApi");

async function getSpaceAccountBalance(ctx) {
  const { space, address } = ctx.params;
  const { snapshot } = ctx.query;

  const spaceService = spaceServices[space];
  const api = await spaceService.getApi();
  const blockHeight = snapshot ? parseInt(snapshot) : getLatestHeight(space);
  const blockHash = await getBlockHash(api, blockHeight);
  const balanceOf = await spaceService.balanceOf(api, blockHash, address);

  ctx.body = balanceOf;
}

module.exports = {
  getSpaceAccountBalance,
}

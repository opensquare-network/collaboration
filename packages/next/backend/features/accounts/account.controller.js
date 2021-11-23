const { HttpError } = require("../../exc");
const { getLatestHeight } = require("../../services/chain.service");
const spaceServices = require("../../spaces");
const { isAddress } = require("@polkadot/util-crypto");

async function getSpaceAccountBalance(ctx) {
  const { space, address } = ctx.params;
  const { snapshot } = ctx.query;

  if (snapshot && !/^[0-9]*$/.test(snapshot)) {
    throw new HttpError(400, "Invalid snapshot number");
  }

  if (!isAddress(address)) {
    throw new HttpError(400, "Invalid address");
  }

  const spaceService = spaceServices[space];
  const blockHeight = snapshot ? parseInt(snapshot) : getLatestHeight(space);
  const totalBalance = await spaceService.getBalance(blockHeight, address)

  ctx.body = {
    balance: totalBalance
  };
}

module.exports = {
  getSpaceAccountBalance,
}

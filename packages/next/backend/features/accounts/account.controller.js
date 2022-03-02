const { HttpError } = require("../../exc");
const { getLatestHeight } = require("../../services/chain.service");
const { spaces: spaceServices } = require("../../spaces");
const { isAddress } = require("@polkadot/util-crypto");
const { getBalanceFromNetwork, getApi } = require("../../services/node.service");

async function getSpaceAccountBalance(ctx) {
  const { space, network, address } = ctx.params;
  const { snapshot } = ctx.query;

  if (snapshot && !/^[0-9]*$/.test(snapshot)) {
    throw new HttpError(400, "Invalid snapshot number");
  }

  if (!isAddress(address)) {
    throw new HttpError(400, "Invalid address");
  }

  const spaceService = spaceServices[space];
  const blockHeight = snapshot ? parseInt(snapshot) : getLatestHeight(network);
  const api = await getApi(network);
  const totalBalance = await getBalanceFromNetwork(
    api,
    {
      networksConfig: spaceService,
      networkName: network,
      address,
      blockHeight,
    }
  );
  ctx.body = {
    balance: totalBalance
  };
}

module.exports = {
  getSpaceAccountBalance,
}

const { evmChains } = require("../../constants");
const { getProviders } = require("./providers");

async function queryBalanceFromOneProvider(provider, address, blockTag) {
  try {
    const balance = await provider.getBalance(address, blockTag);
    return {
      balance: balance.toString(),
    };
  } catch (e) {
    return {};
  }
}

function queryNativeBalance(network, address, blockTag) {
  const providers = getProviders(network);
  let promises = [];
  for (const provider of providers) {
    promises = [
      ...promises,
      queryBalanceFromOneProvider(provider, address, blockTag),
    ];
  }

  return Promise.any(promises);
}

async function getNativeBalance(ctx) {
  const { chain, address, blockHeight } = ctx.params;
  if (!evmChains[chain]) {
    ctx.throw(400, `Invalid chain: ${chain}`);
    return;
  }

  try {
    ctx.body = await queryNativeBalance(
      chain,
      address,
      blockHeight ? parseInt(blockHeight) : "latest",
    );
  } catch (e) {
    ctx.throw(500, e.message);
  }
}

module.exports = {
  getNativeBalance,
};

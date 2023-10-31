const { getApis, getBlockApi } = require("@osn/polkadot-api-container");

async function getBalanceFromOneApi(api, symbol, address, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);

  const accountData = await blockApi.query.rBalances.account(symbol, address);

  const data = accountData?.toJSON();
  return {
    free: data?.free?.toString() || "0",
  };
}

async function getBalanceFromApis(apis, symbol, account, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(
      getBalanceFromOneApi(api, symbol, account, blockHashOrHeight),
    );
  }

  return Promise.any(promises);
}

async function getTotalBalance(ctx) {
  const { chain, symbol, account, blockHashOrHeight } = ctx.params;

  const apis = getApis(chain);
  if (apis.every((api) => !api.isConnected)) {
    ctx.throw(500, "No apis connected");
    return;
  }

  try {
    ctx.body = await getBalanceFromApis(
      apis,
      symbol,
      account,
      blockHashOrHeight,
      chain,
    );
  } catch (e) {
    console.error("Get balance from node fail", e);
    ctx.throw(500, "Failed to query balance from node");
  }
}

module.exports = {
  getTotalBalance,
};

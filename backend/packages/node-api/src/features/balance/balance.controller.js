const { getApis } = require("@osn/polkadot-api-container");
const { getBalanceFromOneApi } = require("./getBalanceFromOneApi");

async function getBalanceFromApis(apis, account, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(getBalanceFromOneApi(api, account, blockHashOrHeight));
  }

  return Promise.any(promises);
}

class BalanceController {
  async getTotalBalance(ctx) {
    const { chain, account, blockHashOrHeight } = ctx.params;

    const apis = getApis(chain);
    if (apis.every((api) => !api.isConnected)) {
      ctx.throw(500, "No apis connected");
      return;
    }

    try {
      ctx.body = await getBalanceFromApis(
        apis,
        account,
        blockHashOrHeight,
        chain,
      );
    } catch (e) {
      console.error("Get balance from node fail", e);
      ctx.throw(500, "Failed to query balance from node");
    }
  }
}

module.exports = new BalanceController();

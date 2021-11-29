const { getBlockApi } = require("../utils");
const { getApis } = require("../../apis");

async function getBalanceFromOneApi(api, assetId, address, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);

  if (!blockApi.query.assets?.account) {
    throw new Error(`${api.name} does not support assets balance query`);
  }

  const account = await blockApi.query.assets.account(assetId, address);
  return account.toJSON();
}

async function getBalanceFromApis(apis, assetId, account, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(getBalanceFromOneApi(api, assetId, account, blockHashOrHeight))
  }

  return Promise.any(promises);
}

class TokenController {
  async getTotalBalance(ctx) {
    const { chain, assetId, account, blockHashOrHeight } = ctx.params;

    const apis = getApis(chain);
    if (apis.every(api => !api.isConnected)) {
      ctx.throw(500, "No apis connected")
      return
    }

    try {
      ctx.body = await getBalanceFromApis(apis, assetId, account, blockHashOrHeight);
    } catch (e) {
      console.error('Get token balance from node fail', e)
      ctx.throw(500, "Failed to query token balance from node")
    }
  }
}

module.exports = new TokenController();

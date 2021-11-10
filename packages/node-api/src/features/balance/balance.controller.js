const { getBlockApi } = require("../utils");
const { getApis } = require("../../apis");

async function getBalanceFromOneApi(api, address, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);

  if (blockApi.query.system?.account) {
    const account = await blockApi.query.system.account(address);
    return account.toJSON()?.data;
  }

  if (blockApi.query.balances) {
    const free = await blockApi.query.balances.freeBalance(address);
    const reserved = await blockApi.query.balances.reservedBalance(address);
    return {
      free: free.toJSON(),
      reserved: reserved.toJSON(),
    };
  }

  return {
    free: 0,
    reserved: 0,
  }
}

async function getBalanceFromApis(apis, account, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(getBalanceFromOneApi(api, account, blockHashOrHeight))
  }

  return Promise.race(promises);
}

class BalanceController {
  async getTotalBalance(ctx) {
    const { chain, account, blockHashOrHeight } = ctx.params;

    const apis = getApis(chain);
    if (apis.every(api => !api.isConnected)) {
      ctx.throw(500, "No apis connected")
      return
    }

    try {
      ctx.body = await getBalanceFromApis(apis, account, blockHashOrHeight);
    } catch (e) {
      console.error('Get balance from node fail', e)
      ctx.throw(500, "Failed to query balance from node")
    }
  }
}

module.exports = new BalanceController();

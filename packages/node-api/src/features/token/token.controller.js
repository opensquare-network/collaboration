const { queryOrmlTokenAccountsFromApis } = require("./orml/balance");
const { supportedChainSymbols, emptyBalance } = require("./constants");
const { getBlockApi } = require("../utils");
const { getApis } = require("../../apis");
const { chains, symbols } = require("../../constants");

async function getBalanceFromOneApi(api, assetId, address, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);

  if (!blockApi.query.assets?.account) {
    throw new Error(`${api.name} does not support assets balance query`);
  }

  const account = await blockApi.query.assets.account(assetId, address);
  if (!account.isSome) {
    return emptyBalance;
  }

  return {
    free: account.value?.balance.toString() || 0,
    reserved: 0,
  }
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

    const isNotStatemine = chain !== chains.statemine;
    const notTokensOnOtherChains = (
      !Object.keys(supportedChainSymbols).includes(chain) ||
      !(supportedChainSymbols[chain] || []).includes(assetId)
    )

    if (isNotStatemine && notTokensOnOtherChains) {
      ctx.throw(404, 'Invalid token')
      return
    }

    const apis = getApis(chain);
    if (chain === chains.karura && assetId === symbols.RMRK) {
      ctx.body = await queryOrmlTokenAccountsFromApis(apis, account, blockHashOrHeight, { ForeignAsset: 0 });
      return
    } else if (chain === chains.bifrost && assetId === symbols.RMRK) {
      ctx.body = await queryOrmlTokenAccountsFromApis(apis, account, blockHashOrHeight, { Token: symbols.RMRK });
      return
    }

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

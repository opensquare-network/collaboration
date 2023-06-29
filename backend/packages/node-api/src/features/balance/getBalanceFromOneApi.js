const { getBlockApi } = require("@osn/polkadot-api-container");

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
  };
}

module.exports = {
  getBalanceFromOneApi,
};

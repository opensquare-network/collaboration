const { emptyBalance } = require("../constants");
const { getBlockHash } = require("../../utils");

/**
 *
 * @param api
 * @param account
 * @param blockHash
 * @param currency currency id of orml tokens, make sure it is not empty
 * @returns {Promise<{reserved: string, free: string}>}
 */
async function queryOrmlTokenAccounts(api, account, blockHash, currency) {
  const blockApi = await api.at(blockHash);
  let result;
  try {
    result = await blockApi.query.tokens.accounts(account, currency);
  } catch (e) {
    return emptyBalance;
  }

  return {
    free: result.free.toString(),
    reserved: result.reserved.toString(),
  };
}

async function queryOrmlTokenAccountsFromApis(apis, account, blockHashOrHeight, currency) {
  const promises = [];

  const blockHash = await getBlockHash(apis, blockHashOrHeight);
  for (const api of apis) {
    promises.push(
      queryOrmlTokenAccounts(api, account, blockHash, currency)
    );
  }

  return Promise.any(promises);
}

module.exports = {
  queryOrmlTokenAccountsFromApis,
}

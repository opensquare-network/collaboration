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
  const result = await blockApi.query.tokens.accounts(account, currency);
  return {
    free: result.free.toString(),
    reserved: result.reserved.toString(),
  };
}

module.exports = {
  queryOrmlTokenAccounts,
}

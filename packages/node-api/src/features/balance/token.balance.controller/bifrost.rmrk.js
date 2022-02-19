const { getBlockHash } = require("../../utils");
const { chains, symbols } = require("../../../constants");
const { getApis } = require("../../../apis");
const { queryOrmlTokenAccounts } = require("./orml.token.accounts");

async function queryRmrkBalanceOnBifrost(account, blockHashOrHeight) {
  const promises = [];

  const apis = getApis(chains.bifrost);
  const blockHash = await getBlockHash(apis, blockHashOrHeight);
  for (const api of apis) {
    promises.push(
      queryOrmlTokenAccounts(api, account, blockHash, { Token: symbols.RMRK })
    );
  }

  return Promise.any(promises);
}

module.exports = {
  queryRmrkBalanceOnBifrost,
}

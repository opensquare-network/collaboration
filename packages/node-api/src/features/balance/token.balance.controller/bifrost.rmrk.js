const { queryOrmlTokenAccountsFromApis } = require("./orml.token.accounts");
const { chains, symbols } = require("../../../constants");
const { getApis } = require("../../../apis");

async function queryRmrkBalanceOnBifrost(account, blockHashOrHeight) {
  const apis = getApis(chains.bifrost);
  return queryOrmlTokenAccountsFromApis(apis, account, blockHashOrHeight, { Token: symbols.RMRK });
}

module.exports = {
  queryRmrkBalanceOnBifrost,
}

const { queryOrmlTokenAccountsFromApis } = require("./orml.token.accounts");
const { chains } = require("../../../constants");
const { getApis } = require("../../../apis");

async function queryRmrkBalanceOnKarura(account, blockHashOrHeight) {
  const apis = getApis(chains.karura);
  return queryOrmlTokenAccountsFromApis(apis, account, blockHashOrHeight, { ForeignAsset: 0 });
}

module.exports = {
  queryRmrkBalanceOnKarura,
}

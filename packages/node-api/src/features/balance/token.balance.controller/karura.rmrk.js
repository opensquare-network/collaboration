const { queryOrmlTokenAccounts } = require("./orml.token.accounts");
const { getBlockHash } = require("../../utils");
const { chains } = require("../../../constants");
const { getApis } = require("../../../apis");

async function queryRmrkBalanceOnKarura(account, blockHashOrHeight) {
  const promises = [];

  const apis = getApis(chains.karura);
  const blockHash = await getBlockHash(apis, blockHashOrHeight);
  for (const api of apis) {
    promises.push(
      queryOrmlTokenAccounts(api, account, blockHash, { ForeignAsset: 0 })
    );
  }

  return Promise.any(promises);
}

module.exports = {
  queryRmrkBalanceOnKarura,
}

const { getBlockHash } = require("../../utils");
const { chains } = require("../../../constants");
const { getApis } = require("../../../apis");

async function queryFromOneApi(api, account, blockHash) {
  const blockApi = await api.at(blockHash);
  const result = await blockApi.query.tokens.accounts(account, { ForeignAsset: 0 });
  return {
    free: result.free.toString(),
    reserved: result.reserved.toString(),
  };
}

async function queryRmrkBalanceOnKarura(account, blockHashOrHeight) {
  const promises = [];

  const apis = getApis(chains.karura);
  const blockHash = await getBlockHash(apis, blockHashOrHeight);
  for (const api of apis) {
    promises.push(queryFromOneApi(api, account, blockHash));
  }

  return Promise.any(promises);
}

module.exports = {
  queryRmrkBalanceOnKarura,
}

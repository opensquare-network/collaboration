const { getBlockApi } = require("../utils");
const { getApis } = require("../../apis");

async function queryOneApi(api, blockHashOrHeight) {
  const blockApi = await getBlockApi(api, blockHashOrHeight);
  const issuance = await blockApi.query.balances.totalIssuance();
  return issuance.toString();
}

async function queryNativeTokenIssuance(chain, blockHashOrHeight) {
  const apis = getApis(chain);
  const promises = [];
  for (const api of apis) {
    promises.push(queryOneApi(api, blockHashOrHeight));
  }

  return Promise.any(promises);
}

module.exports = {
  queryNativeTokenIssuance,
};

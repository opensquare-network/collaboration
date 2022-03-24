const { getApis } = require("../../apis");
const { getBlockApi } = require("../utils");

async function queryOneApi(api, tokenConfig, blockHashOrHeight) {
  const blockApi = await getBlockApi(api, blockHashOrHeight);

  const issuance = await blockApi.query[tokenConfig.moduleName].totalIssuance(
    tokenConfig.currencyId
  );
  return issuance.toString();
}

async function queryOrmlTokenIssuance(tokenConfig, blockHashOrHeight) {
  const apis = getApis(tokenConfig.chain);
  const promises = [];
  for (const api of apis) {
    promises.push(queryOneApi(api, tokenConfig, blockHashOrHeight));
  }

  return Promise.any(promises);
}

module.exports = {
  queryOrmlTokenIssuance,
};

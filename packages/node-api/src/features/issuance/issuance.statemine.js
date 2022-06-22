const { getApis } = require("@osn/polkadot-api-container");
const { getBlockApi } = require("../utils");

async function queryOneApi(api, tokenConfig, blockHashOrHeight) {
  const blockApi = await getBlockApi(api, blockHashOrHeight);

  const issuance = await blockApi.query.assets.asset(tokenConfig.assetId);
  return issuance.toJSON().supply;
}

async function queryStatemineAssetIssuance(tokenConfig, blockHashOrHeight) {
  const apis = getApis(tokenConfig.chain);
  const promises = [];
  for (const api of apis) {
    promises.push(queryOneApi(api, tokenConfig, blockHashOrHeight));
  }

  return Promise.any(promises);
}

module.exports = {
  queryStatemineAssetIssuance,
};

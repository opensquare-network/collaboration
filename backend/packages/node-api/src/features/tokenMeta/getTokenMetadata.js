const { getApis } = require("@osn/polkadot-api-container");
const { chains } = require("../../constants");
const { hexToString } = require("@polkadot/util");

async function getAssetMetadataFromOneApi(api, assetId) {
  if (!api.query.assets?.metadata) {
    throw new Error(`${api.name} does not support assets metadata query`);
  }

  const metadata = await api.query.assets.metadata(assetId);
  const { symbol: hexSymbol, decimals } = metadata.toJSON();
  if (hexSymbol === "0x") {
    return {};
  }

  const symbol = hexToString(hexSymbol);

  return {
    symbol,
    decimals,
  };
}

async function getAssetMetadataFromApis(apis, assetId) {
  const promises = [];
  for (const api of apis) {
    promises.push(getAssetMetadataFromOneApi(api, assetId));
  }

  return Promise.any(promises);
}

async function getTokenMetadata(ctx) {
  const { chain, assetId } = ctx.params;

  const isNotStatemine = ![chains.statemine, chains.statemint].includes(chain);

  if (isNotStatemine) {
    ctx.throw(404, "Invalid token");
    return;
  }

  const apis = getApis(chain);
  if (apis.every((api) => !api.isConnected)) {
    ctx.throw(500, "No apis connected");
    return;
  }

  try {
    ctx.body = await getAssetMetadataFromApis(apis, assetId);
  } catch (e) {
    console.error("Get token balance from node fail", e);
    ctx.throw(500, "Failed to query token metadata from node");
  }
}

module.exports = {
  getTokenMetadata,
};

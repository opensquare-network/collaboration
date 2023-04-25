const { getApis } = require("@osn/polkadot-api-container");

async function getNativeTokenInfoFromOneApi(api) {
  const properties = await api.rpc.system.properties();
  const { tokenSymbol, tokenDecimals, ss58Format } = properties;
  if (tokenSymbol.isNil || tokenDecimals.isNil || ss58Format.isNil) {
    throw new Error("Unexpected token info");
  }

  return {
    ss58Format: ss58Format.toJSON(),
    symbol: tokenSymbol.value[0].toString(),
    decimals: tokenDecimals.value[0].toNumber(),
  };
}

async function getNativeTokenInfoFromApis(apis) {
  const promises = [];
  for (const api of apis) {
    promises.push(getNativeTokenInfoFromOneApi(api));
  }

  return Promise.any(promises);
}

async function getNativeTokenInfo(ctx) {
  const { chain } = ctx.params;
  const apis = getApis(chain);
  if (apis.every((api) => !api.isConnected)) {
    ctx.throw(500, "No apis connected");
    return;
  }

  try {
    const tokenInfo = await getNativeTokenInfoFromApis(apis);
    ctx.body = tokenInfo;
  } catch (e) {
    console.error("Get token info from node fail", e);
    ctx.throw(500, "Failed to get token info from node");
  }
}

module.exports = {
  getNativeTokenInfo,
};

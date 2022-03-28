const { evmChains } = require("../../constants");
const { WsProvider } = require("@polkadot/api");

/**
 * { moonriver: [ { endpoint: 'wss:...', provider } ] }
 */
const chainProviders = {};

async function initEvmSubstrateProviders(chain) {
  let endpoints;
  if (evmChains.moonriver === chain) {
    endpoints = (process.env.EVM_MOVR_ENDPOINTS || "").split(";");
  } else if (evmChains.moonbeam === chain) {
    endpoints = (process.env.EVM_GLMR_ENDPOINTS || "").split(";");
  }

  if (!endpoints || (endpoints || []).length <= 0) {
    throw new Error(`No endpoints set for ${chain}`);
  }

  const providers = [];
  for (const endpoint of endpoints) {
    const provider = new WsProvider(endpoint, 100);
    providers.push({
      endpoint,
      provider,
    });
  }

  chainProviders[chain] = providers;
  return await Promise.all(
    providers.map(({ provider }) => provider.isReadyOrError)
  );
}

async function initEvmProviders() {
  const promises = [];
  for (const chain of Object.values(evmChains)) {
    promises.push(initEvmSubstrateProviders(chain));
  }

  await Promise.all(promises);
}

function getEvmProviders(chain) {
  const providers = chainProviders[chain];
  if (!providers || providers.length <= 0) {
    throw new Error(`No providers for ${chain}`);
  }

  return providers.map(({ provider }) => provider);
}

module.exports = {
  initEvmProviders,
  getEvmProviders,
};

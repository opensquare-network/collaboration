const { nodeTimeoutSeconds } = require("../constants");
const { statusLogger } = require("../logger");
const { khalaOptions } = require("./khala");
const { karuraOptions } = require("./karura");
const { bifrostOptions } = require("./bifrost");
const { kintsugiOptions } = require("./kintsugi");
const { chains } = require("../constants");
const { ApiPromise, WsProvider } = require("@polkadot/api");
const { getEndpoints } = require("../env")

/**
 * { polkadot: { apis: [ { endpoint: 'wss:...', api } ] } }
 */
const chainApis = {};

/**
 * { 'wss://rpc.polkadot.io': [a api object] }
 */
const endpointApis = {};

const rejectInTime = (seconds) => new Promise((resolve, reject) => setTimeout(reject, seconds * 1000));

async function createApi(network, endpoint) {
  const provider = new WsProvider(endpoint, 100);

  let options = {};
  if (chains.karura === network) {
    options = karuraOptions;
  } else if (chains.khala === network) {
    options = khalaOptions;
  } else if (chains.bifrost === network) {
    options = bifrostOptions;
  } else if (chains.kintsugi === network) {
    options = kintsugiOptions;
  }

  const api = new ApiPromise({ provider, ...options });
  endpointApis[endpoint] = api;

  api.isReadyOrError.catch(() => {
    // ignore
  });

  return {
    endpoint,
    api: await api.isReady
  };
}

async function createApiInLimitTime(network, endpoint) {
  return Promise.race([
    createApi(network, endpoint),
    rejectInTime(nodeTimeoutSeconds),
  ]);
}

async function createApiForChain({ chain, endpoints }) {
  const apis = [];

  for (const endpoint of endpoints) {
    try {
      const api = await createApiInLimitTime(chain, endpoint);
      apis.push(api);
      console.log(`${ chain } api with endpoint ${ endpoint } created!`);
    } catch (e) {
      statusLogger.info(`Can not connected to ${ endpoint } in ${ nodeTimeoutSeconds } seconds, just disconnect it`)
      const maybeApi = endpointApis[endpoint]
      if (maybeApi) {
        maybeApi.disconnect();
      }
    }
  }

  return {
    chain,
    apis,
  }
}

async function createChainApis() {
  const chainEndpoints = getEndpoints();

  const promises = []
  for (const { chain, endpoints } of chainEndpoints) {
    promises.push(createApiForChain({ chain, endpoints }));
  }

  const chainApisArr = await Promise.all(promises);
  for (const { chain, apis } of chainApisArr) {
    chainApis[chain] = apis
  }
}

function getApis(chain) {
  return (chainApis[chain] || []).map(({ api }) => api)
}

function logApiStatus() {
  Object.entries(chainApis).map(([chain, apis]) => {
    statusLogger.info(`chain: ${ chain }`);
    for (const { endpoint, api } of apis) {
      statusLogger.info(`\t ${ endpoint } connected: ${ api.isConnected }`)
    }
  })

  setTimeout(logApiStatus, 3 * 60 * 1000);
}

module.exports = {
  createChainApis,
  getApis,
  logApiStatus,
}

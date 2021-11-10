const { khalaOptions } = require("./khala");
const { karuraOptions } = require("./karura");
const { chains } = require("../constants");
const { ApiPromise, WsProvider } = require("@polkadot/api");
const { getEndpoints } = require("../env")

const chainApis = {};

async function createApi(network, endpoint) {
  const provider = new WsProvider(endpoint, 100);

  let options = {};
  if (chains.karura === network) {
    options = karuraOptions;
  } else if (chains.khala === network) {
    options = khalaOptions;
  }

  const api = await ApiPromise.create({ provider, ...options });
  console.log(`${ network } api with endpoint ${ endpoint } created!`);
  return {
    endpoint,
    api
  };
}

async function createApiForChain({ chain, endpoints }) {
  const promises = [];

  for (const endpoint of endpoints) {
    promises.push(createApi(chain, endpoint))
  }

  return {
    chain,
    apis: await Promise.all(promises)
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
  return chainApis[chain] || []
}

function logApiStatus() {
  Object.entries(chainApis).map(([chain, apis]) => {
    console.log(`chain: ${ chain }`);
    for (const { endpoint, api } of apis) {
      console.log(`\t ${ endpoint } connected: ${ api.isConnected }`)
    }
  })

  setTimeout(logApiStatus, 3 * 60 * 1000);
}

module.exports = {
  createChainApis,
  getApis,
  logApiStatus,
}

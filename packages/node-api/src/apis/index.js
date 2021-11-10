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
  return api;
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

module.exports = {
  createChainApis,
  getApis,
}

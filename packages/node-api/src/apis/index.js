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

async function createChainApis() {
  const chainEndpoints = getEndpoints();

  for (const { chain, endpoints } of chainEndpoints) {
    const apis = [];
    for (const endpoint of endpoints) {
      const api = await createApi(chain, endpoint);
      apis.push(api);
    }

    chainApis[chain] = apis;
  }
}

module.exports = {
  createChainApis,
}

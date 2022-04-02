const { statusLogger } = require("../../logger");
const { evmChains } = require("../../constants");
const { ethers } = require("ethers");

let evmProviderMap;

const movrUrls = [
  "https://rpc.api.moonriver.moonbeam.network",
  "https://moonriver-alpha.api.onfinality.io/public",
  "wss://wss.api.moonriver.moonbeam.network",
];

const glmrUrls = [
  "https://rpc.api.moonbase.moonbeam.network",
  "https://moonbeam-alpha.api.onfinality.io/public",
  "wss://wss.api.moonbase.moonbeam.network",
  "wss://moonbeam-alpha.api.onfinality.io/public-ws",
];

function createProvider(url = "", network) {
  if (url.startsWith("wss")) {
    return new ethers.providers.WebSocketProvider(url, network);
  }

  return new ethers.providers.StaticJsonRpcProvider(url, network);
}

const movrChainId = 1285;
const glmrChainId = 1284;
const movrNetwork = {
  chainId: movrChainId,
  name: evmChains.moonriver,
};
const glmrNetwork = {
  chainId: glmrChainId,
  name: evmChains.moonbeam,
};

function initProviders() {
  const movrProviders = [];
  for (const url of movrUrls) {
    try {
      const provider = createProvider(url, movrNetwork);
      if (provider) {
        movrProviders.push(provider);
      }
    } catch (e) {
      statusLogger.error(`Can not construct provider from ${url}, ignore`);
    }
  }

  const glmrProviders = glmrUrls.map((url) => createProvider(url, glmrNetwork));

  evmProviderMap = {
    [evmChains.moonriver]: movrProviders,
    [evmChains.moonbeam]: glmrProviders,
  };
}

function getProviders(network) {
  if (!evmProviderMap) {
    initProviders();
  }

  return evmProviderMap[network] || [];
}

module.exports = {
  getProviders,
};

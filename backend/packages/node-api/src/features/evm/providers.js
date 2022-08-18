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

const ethUrls = [
  `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_KEY}`,
  `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
];

function createProvider(url = "", network) {
  try {
    if (url.startsWith("wss")) {
      return new ethers.providers.WebSocketProvider(url, network);
    }

    return new ethers.providers.StaticJsonRpcProvider(url, network);
  } catch (e) {
    statusLogger.error(`Can not construct provider from ${url}, ignore`);
  }
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
const ethNetwork = {
  chainId: 1,
  name: "homestead",
};

function initProviders() {
  const movrProviders = movrUrls.map((url) => createProvider(url, movrNetwork));
  const glmrProviders = glmrUrls.map((url) => createProvider(url, glmrNetwork));

  if (!process.env.INFURA_KEY) {
    throw new Error("INFURA_KEY environment variable not set");
  }
  if (process.env.ALCHEMY_KEY) {
    ethUrls.push(
      ...[
        `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
        `wss://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      ]
    );
  }
  const ethProviders = ethUrls.map((url) => createProvider(url, ethNetwork));

  evmProviderMap = {
    [evmChains.moonriver]: movrProviders,
    [evmChains.moonbeam]: glmrProviders,
    [evmChains.ethereum]: ethProviders,
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

const { statusLogger } = require("../../logger");
const { evmChains } = require("../../constants");
const { ethers } = require("ethers");

let evmProviderMap;

const ethUrls = [
  `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_KEY}`,
  `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
];

const creditcoinEvmUrls = [`https://mainnet3.creditcoin.network`];

const astarUrls = ["https://evm.astar.network/"];

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

const creditcoinEvmChainId = 102030;
const ethNetwork = {
  chainId: 1,
  name: "homestead",
};
const creditcoinEvmNetwork = {
  chainId: creditcoinEvmChainId,
  name: evmChains.creditcoin_evm,
};
const astarEvmNetwork = {
  chainId: 592,
  name: evmChains.astar_evm,
};

function initProviders() {
  const creditcoinEvmProviders = creditcoinEvmUrls.map((url) =>
    createProvider(url, creditcoinEvmNetwork),
  );
  const astarEvmProviders = astarUrls.map((url) =>
    createProvider(url, astarEvmNetwork),
  );

  if (!process.env.INFURA_KEY) {
    throw new Error("INFURA_KEY environment variable not set");
  }
  if (process.env.ALCHEMY_KEY) {
    ethUrls.push(
      ...[
        `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
        `wss://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      ],
    );
  }
  const ethProviders = ethUrls.map((url) => createProvider(url, ethNetwork));

  evmProviderMap = {
    [evmChains.ethereum]: ethProviders,
    [evmChains.creditcoin_evm]: creditcoinEvmProviders,
    [evmChains.astar_evm]: astarEvmProviders,
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

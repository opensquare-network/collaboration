const { evmChains } = require("../../constants");
const { ethers } = require("ethers");
const movrProviderUrl = "https://rpc.api.moonriver.moonbeam.network";
const glmrProviderUrl = "https://rpc.api.moonbeam.network";
const movrChainId = 1285;
const glmrChainId = 1284;

const movrProvider = new ethers.providers.StaticJsonRpcProvider(
  movrProviderUrl,
  {
    chainId: movrChainId,
    name: evmChains.moonriver,
  }
);

const glmrProvider = new ethers.providers.StaticJsonRpcProvider(
  glmrProviderUrl,
  {
    chainId: glmrChainId,
    name: evmChains.moonbeam,
  }
);

const evmProviderMap = Object.freeze({
  [evmChains.moonriver]: movrProvider,
  [evmChains.moonbeam]: glmrProvider,
});

module.exports = {
  evmProviderMap,
};

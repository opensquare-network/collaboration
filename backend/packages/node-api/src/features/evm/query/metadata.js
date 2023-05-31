const { getProviders } = require("../providers");
const { ethers } = require("ethers");
const { erc20Abi } = require("./erc20Abi");

async function queryMetadataFromOneProvider(contract, provider) {
  const erc20 = new ethers.Contract(contract, erc20Abi, provider);

  const decimals = await erc20.decimals();
  const symbol = await erc20.symbol();

  return {
    symbol,
    decimals,
  };
}

function queryMetadata(network, contract) {
  const providers = getProviders(network);
  return Promise.any(
    providers.map((provider) =>
      queryMetadataFromOneProvider(contract, provider),
    ),
  );
}

module.exports = {
  queryMetadata,
};

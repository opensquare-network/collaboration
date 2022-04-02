const { getProviders } = require("../providers");
const { ethers } = require("ethers");
const { erc20Abi } = require("../abi");

async function queryBalanceFromOneProvider(
  contract,
  provider,
  address,
  blockTag
) {
  const erc20 = new ethers.Contract(contract, erc20Abi, provider);

  let promises = [];
  for (let i = 0; i < 2; i++) {
    promises.push(erc20.balanceOf(address, { blockTag }));
  }

  return Promise.any(promises);
}

async function queryBalance(network, contract, address, blockTag) {
  const providers = getProviders(network);
  let promises = [];
  for (const provider of providers) {
    promises.push(
      queryBalanceFromOneProvider(contract, provider, address, blockTag)
    );
  }

  return Promise.any(promises);
}

module.exports = {
  queryBalance,
};

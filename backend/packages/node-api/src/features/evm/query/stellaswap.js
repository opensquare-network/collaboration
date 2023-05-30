const { getProviders } = require("../providers");
const { ethers } = require("ethers");
const { stellaswapAbi } = require("./stellaswapAbi");

async function getUserInfoAmount(stellaswap, address, blockTag) {
  const userInfo = await stellaswap.userInfo(3, address, { blockTag });
  return userInfo.amount;
}

function queryBalanceFromOneProvider(contract, provider, address, blockTag) {
  const stellaswap = new ethers.Contract(contract, stellaswapAbi, provider);

  let promises = [];
  for (let i = 0; i < 2; i++) {
    promises.push(getUserInfoAmount(stellaswap, address, blockTag));
  }
  return promises;
}

async function queryBalance(network, contract, address, blockTag) {
  const providers = getProviders(network);
  let promises = [];
  for (const provider of providers) {
    promises = [
      ...promises,
      ...queryBalanceFromOneProvider(contract, provider, address, blockTag),
    ];
  }

  return Promise.any(promises);
}

module.exports = {
  queryBalance,
};

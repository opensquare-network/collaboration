async function getTotalBalance(api, blockHeight, address) {
  console.log("Use mock getTotalBalance");
  return "10000000000000";
}

async function getTokenBalance(api, assetId, blockHeight, address) {
  console.log("Use mock getTokenBalance");
  return "10000000000000";
}

async function getChainHeight(api) {
  console.log("Use mock getChainHeight");
  return { height: 100000 };
}

async function checkProxy(api, delegatee, delegator, blockHeight) {
  console.log("Use mock checkProxy");
  return { isProxy: true };
}

function getBalanceFromNetwork({
  networksConfig,
  networkName,
  address,
  blockHeight,
}) {
  console.log("Use mock getBalanceFromNetwork");
  return "10000000000000";
}

module.exports = {
  getTotalBalance,
  getTokenBalance,
  getChainHeight,
  checkProxy,
  getBalanceFromNetwork,
};

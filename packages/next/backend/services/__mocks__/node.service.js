const getApi = async (chain) => {
  console.log(`Use mock getApi`)
  return null;
};

async function getTotalBalance(api, blockHeight, address) {
  console.log(`Use mock getTotalBalance`)
  return "10000000000000";
}

async function getTokenBalance(api, assetId, blockHeight, address) {
  console.log(`Use mock getTokenBalance`)
  return "10000000000000";
}

async function getFinalizedHeight(api) {
  console.log(`Use mock getFinalizedHeight`)
  return { height: 100000 };
}

async function checkDelegation(api, delegatee, delegator, blockHeight) {
  console.log(`Use mock checkDelegation`)
  return { isProxy: true };
}

module.exports = {
  getApi,
  getTotalBalance,
  getTokenBalance,
  getFinalizedHeight,
  checkDelegation,
};

const getApi = async (nodeSetting) => {
  console.log(`Use mock getApi`)
  return null;
};

async function getTotalBalance(api, blockHeight, address) {
  console.log(`Use mock getTotalBalance`)
  return "10000000000000";
}

async function getBlockHash(api, blockHeight) {
  console.log(`Use mock getBlockHash`)
  return "0x67a21e3f1ba1746b521a903c535db5dd5f3053a42b10b4229dd819b78c84e733";
}

async function checkDelegation(api, delegatee, delegator, blockHeight) {
  console.log(`Use mock checkDelegation`)
  return true;
}

module.exports = {
  getApi,
  getTotalBalance,
  getBlockHash,
  checkDelegation,
};

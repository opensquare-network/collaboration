const getApi = async (nodeSetting) => {
  console.log(`Use mock getApi`)
  return null;
};

async function getBalance(api, blockHash, address) {
  console.log(`Use mock getSystemBalance`)
  return {
    free: "10000000000000",
    reserved: 0,
  };
}

async function getBlockHash(api, blockHeight) {
  console.log(`Use mock getBlockHash`)
  return "0x67a21e3f1ba1746b521a903c535db5dd5f3053a42b10b4229dd819b78c84e733";
}

async function checkDelegation(api, delegatee, delegator, blockHash) {
  console.log(`Use mock checkDelegation`)
  return true;
}

module.exports = {
  getApi,
  getBalance,
  getBlockHash,
  checkDelegation,
};

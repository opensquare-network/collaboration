const { NODE_API_ENDPOINT } = require("../../env");
const { isTestAccount } = require("../../utils");
const { fetchApi } = require("../../utils/fech.api");

async function getStellaSwapAddressStaking(network, address, height) {
  if (isTestAccount(address)) {
    return {
      balance: process.env.TEST_ACCOUNT_BALANCE || "10000000000000",
    };
  }

  let url = `${NODE_API_ENDPOINT}`;
  url += `/evm/chain/${network}/stellaswap_staking/address/${address}/height/${height}`;

  const { balance } = await fetchApi(url);
  return { balance };
}

module.exports = {
  getStellaSwapAddressStaking,
};

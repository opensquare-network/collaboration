const { getBlockApi } = require("@osn/polkadot-api-container");
const { chains } = require("../../constants");

async function getKintBalanceFromOneApi(
  api,
  address,
  blockHashOrHeight,
  chain,
) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);

  let token;
  if (chains.kintsugi === chain) {
    token = "KINT";
  } else if (chains.interlay === chain) {
    token = "INTR";
  }

  const account = await blockApi.query.tokens.accounts(address, { token });
  return {
    free: account.free.toString(),
    reserved: account.reserved.toString(),
  };
}

module.exports = {
  getKintBalanceFromOneApi,
};

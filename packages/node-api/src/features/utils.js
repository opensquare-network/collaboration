const { isHex } = require("@polkadot/util")

async function getBlockApi(apiWrapper, blockHashOrHeight) {
  const api = apiWrapper.api;
  if (!blockHashOrHeight) {
    return api;
  }

  if (isHex(blockHashOrHeight)) {
    return await api.at(blockHashOrHeight);
  } else if (/^\d+$/.test(blockHashOrHeight)) {
    const hash = await api.rpc.chain.getBlockHash(blockHashOrHeight);
    return await api.at(hash);
  }

  throw 'Invalid block hash or height'
}

module.exports = {
  getBlockApi,
}

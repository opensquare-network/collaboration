const { isHex } = require("@polkadot/util")

async function getBlockApi(api, blockHashOrHeight) {
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

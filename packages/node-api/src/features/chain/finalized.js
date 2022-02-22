const { extractBlockTime } = require("./blockTime");

async function getFinalizedHeightTimeFromOneApi(api) {
  const blockHash = await api.rpc.chain.getFinalizedHead();
  const block = await api.rpc.chain.getBlock(blockHash);

  const height = block.block.header.number.toNumber();
  const time = extractBlockTime(block.block.extrinsics);
  return {
    height,
    time,
  }
}

async function getFinalizedHeightFromApis(apis) {
  const promises = [];
  for (const api of apis) {
    promises.push(getFinalizedHeightTimeFromOneApi(api));
  }

  return Promise.any(promises);
}

module.exports = {
  getFinalizedHeightFromApis,
}

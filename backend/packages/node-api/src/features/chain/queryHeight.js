const { twelveSecond } = require("../../constants");
const { extractBlockTime } = require("./blockTime");
const { chainBlockTime } = require("../../constants");

const blockNumberThreshold = 3;

async function getBlockTimeByHeight(api, height) {
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const block = await api.rpc.chain.getBlock(blockHash);
  return extractBlockTime(block.block.extrinsics);
}

async function getBlockTimeByHeightFromApis(apis, height) {
  const promises = [];
  for (const api of apis) {
    promises.push(getBlockTimeByHeight(api, height));
  }

  return Promise.any(promises);
}

async function getExpected(chain, apis, lastHeightTime, targetTime) {
  const { height, time } = lastHeightTime;

  const gap = Math.abs(targetTime - time);
  const heightGap = Math.trunc(gap / chainBlockTime[chain]);

  let expectedHeight;
  if (time > targetTime) {
    expectedHeight = Math.max(height - heightGap, 1);
  } else {
    expectedHeight = Math.max(height + heightGap, 1);
  }

  const expectedTime = await getBlockTimeByHeightFromApis(apis, expectedHeight);
  const newGap = Math.abs(expectedTime - targetTime);
  return newGap < gap
    ? {
        height: expectedHeight,
        time: expectedTime,
      }
    : lastHeightTime;
}

async function getHeightByTime(chain, apis, targetTime, lastHeightTime) {
  const { height, time } = lastHeightTime;
  const blockTime = chainBlockTime[chain] || twelveSecond;
  const gap = Math.abs(targetTime - time);
  if (gap <= blockNumberThreshold * blockTime) {
    return lastHeightTime;
  }

  const { height: expectedHeight, time: expectedTime } = await getExpected(
    chain,
    apis,
    lastHeightTime,
    targetTime,
  );
  if (expectedHeight === height) {
    return lastHeightTime;
  }

  return await getHeightByTime(chain, apis, targetTime, {
    height: expectedHeight,
    time: expectedTime,
  });
}

module.exports = {
  getHeightByTime,
};

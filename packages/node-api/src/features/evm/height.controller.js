const { chainBlockTime } = require("../../constants");
const { getEvmProviders } = require("./substrateProviders");

const blockNumberThreshold = 3;

async function getBlockTimeByHeightFromProvider(provider, expectedHeight) {
  const block = await provider.send("eth_getBlockByNumber", [
    expectedHeight,
    false,
  ]);
  return block.timestamp * 1000;
}

async function getBlockTimeByHeightFromProviders(providers, expectedHeight) {
  return Promise.any(
    providers.map((provider) =>
      getBlockTimeByHeightFromProvider(provider, expectedHeight)
    )
  );
}

async function getExpected(chain, lastHeightTime, targetTime) {
  const { height, time } = lastHeightTime;

  const gap = Math.abs(targetTime - time);
  const heightGap = Math.trunc(gap / chainBlockTime[chain]);

  let expectedHeight;
  if (time > targetTime) {
    expectedHeight = Math.max(height - heightGap, 1);
  } else {
    expectedHeight = Math.max(height + heightGap, 1);
  }

  const expectedTime = await getBlockTimeByHeightFromProviders(
    getEvmProviders(chain),
    expectedHeight
  );
  const newGap = Math.abs(expectedTime - targetTime);
  return newGap < gap
    ? {
        height: expectedHeight,
        time: expectedTime,
      }
    : lastHeightTime;
}

async function getHeightByTime(chain, targetTime, lastHeightTime) {
  const { height, time } = lastHeightTime;
  const blockTime = chainBlockTime[chain];
  const gap = Math.abs(targetTime - time);
  if (gap <= blockNumberThreshold * blockTime) {
    return lastHeightTime;
  }

  const { height: expectedHeight, time: expectedTime } = await getExpected(
    chain,
    lastHeightTime,
    targetTime
  );
  if (expectedHeight === height) {
    return lastHeightTime;
  }

  return await getHeightByTime(chain, targetTime, {
    height: expectedHeight,
    time: expectedTime,
  });
}

async function getTargetHeight(ctx) {
  const { chain, timestamp } = ctx.params;
  const targetTime = timestamp || String(new Date().getTime());

  if (!/^\d+$/.test(targetTime)) {
    ctx.throw(400, `Invalid time`);
    return;
  }

  const providers = getEvmProviders(chain);
  const height = await Promise.any(
    providers.map((provider) => provider.send("eth_blockNumber", []))
  );
  const time = await getBlockTimeByHeightFromProviders(
    providers,
    parseInt(height)
  );

  ctx.body = await getHeightByTime(chain, targetTime, {
    height: parseInt(height),
    time,
  });
}

module.exports = {
  getTargetHeight,
};

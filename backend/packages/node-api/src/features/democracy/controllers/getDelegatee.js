const { chains } = require("../../../constants");
const { getApis, getBlockApi } = require("@osn/polkadot-api-container");

async function getDelegateeFromOneApi(api, delegator, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);
  const votingOf = await blockApi.query.democracy.votingOf(delegator);
  if (!votingOf.isDelegating) {
    return {};
  }

  const delegating = votingOf.asDelegating;
  return {
    delegator,
    delegatee: delegating.target.toString(),
    balance: delegating.balance.toString(),
  };
}

async function getDelegateeFromApis(apis, delegator, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(getDelegateeFromOneApi(api, delegator, blockHashOrHeight));
  }

  return await Promise.any(promises);
}

async function getDelegatee(ctx) {
  const { chain, delegator } = ctx.params;
  const { block: blockHashOrHeight } = ctx.query;
  if (![chains.centrifuge, chains.altair, chains.rococo].includes(chain)) {
    ctx.throw(400, `Not support chain ${chain}`);
  }

  const apis = getApis(chain);
  ctx.body = await getDelegateeFromApis(apis, delegator, blockHashOrHeight);
}

module.exports = {
  getDelegatee,
};

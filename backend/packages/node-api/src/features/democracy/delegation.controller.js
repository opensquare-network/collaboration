const { chains } = require("../../constants");
const { getApis, getBlockApi } = require("@osn/polkadot-api-container");

function getAddress(storageKey, api) {
  let pubKeyU8a;
  if (storageKey.length === 72) {
    pubKeyU8a = storageKey.slice(40);
  }
  if (!pubKeyU8a) {
    throw new Error(`Unexpected storage key length ${storageKey.length}`);
  }

  const accountId = api.registry.createType("AccountId", pubKeyU8a);
  return accountId.toString();
}

async function getDelegatorsFromOneApi(api, delegatee, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);
  const votingOf = await blockApi.query.democracy.votingOf.entries();
  const allDelegations = votingOf.filter((item) => item[1].isDelegating);
  const targetDelegations = allDelegations.filter(([, voting]) => {
    const delegating = voting.asDelegating;
    return delegatee === delegating.target.toString();
  });

  return targetDelegations.map(([key, voting]) => {
    const delegating = voting.asDelegating;
    const delegator = getAddress(key, api);
    const delegatee = delegating.target.toString();
    const balance = delegating.balance.toString();

    return {
      delegator,
      delegatee,
      balance,
    };
  });
}

async function getDelegateeFromOneApi(api, delegator, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);
  const votingOf = await blockApi.query.democracy.votingOf.entries();
  const allDelegations = votingOf.filter((item) => item[1].isDelegating);
  const targetDelegations = allDelegations.filter(([key]) => {
    const [address] = key.args;
    return delegator === address.toJSON();
  });

  return targetDelegations.map(([, voting]) => {
    const delegating = voting.asDelegating;
    const delegatee = delegating.target.toString();
    const balance = delegating.balance.toString();

    return {
      delegator,
      delegatee,
      balance,
    };
  });
}

async function getDelegatorsFromApis(apis, delegatee, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(getDelegatorsFromOneApi(api, delegatee, blockHashOrHeight));
  }

  return await Promise.any(promises);
}

async function getDelegateeFromApis(apis, delegator, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(getDelegateeFromOneApi(api, delegator, blockHashOrHeight));
  }

  return await Promise.any(promises);
}

async function getDelegators(ctx) {
  const { chain, delegatee } = ctx.params;
  const { block: blockHashOrHeight } = ctx.query;
  if (![chains.centrifuge, chains.altair].includes(chain)) {
    ctx.throw(400, `Not support chain ${chain}`);
  }

  const apis = getApis(chain);
  ctx.body = await getDelegatorsFromApis(apis, delegatee, blockHashOrHeight);
}

async function getDelegatee(ctx) {
  const { chain, delegator } = ctx.params;
  const { block: blockHashOrHeight } = ctx.query;
  if (![chains.centrifuge, chains.altair].includes(chain)) {
    ctx.throw(400, `Not support chain ${chain}`);
  }

  const apis = getApis(chain);
  ctx.body = await getDelegateeFromApis(apis, delegator, blockHashOrHeight);
}

module.exports = {
  getDelegators,
  getDelegatee,
};

const { getApis, getBlockApi } = require("@osn/polkadot-api-container");
const { chains } = require("../../constants");

async function getSocietyMembersCountFromOneApi(api, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);
  const societyMembers = await blockApi.query.society.members.entries();
  return { count: societyMembers.length };
}

async function getSocietyMembersCountFromApis(apis, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(getSocietyMembersCountFromOneApi(api, blockHashOrHeight));
  }

  return await Promise.any(promises);
}

async function getSocietyMembersCount(ctx) {
  const { chain, blockHashOrHeight } = ctx.params;
  if (![chains.kusama].includes(chain)) {
    ctx.throw(400, `Not support chain ${chain}`);
  }

  const apis = getApis(chain);
  ctx.body = await getSocietyMembersCountFromApis(apis, blockHashOrHeight);
}

module.exports = {
  getSocietyMembersCount,
};

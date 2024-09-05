const { getApis, getBlockApi } = require("@osn/polkadot-api-container");
const { chains } = require("../../constants");

async function getSocietyMembersFromOneApi(api, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);
  const societyMembers = await blockApi.query.society.members.entries();

  return societyMembers.map(([key, value]) => {
    const {
      args: [id],
    } = key;
    const address = id.toJSON();
    const data = value.toJSON();
    return { address, ...data };
  });
}

async function getSocietyMembersFromApis(apis, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(getSocietyMembersFromOneApi(api, blockHashOrHeight));
  }

  return await Promise.any(promises);
}

async function getSocietyMembers(ctx) {
  const { chain, blockHashOrHeight } = ctx.params;
  if (![chains.kusama].includes(chain)) {
    ctx.throw(400, `Not support chain ${chain}`);
  }

  const apis = getApis(chain);
  ctx.body = await getSocietyMembersFromApis(apis, blockHashOrHeight);
}

module.exports = {
  getSocietyMembers,
};

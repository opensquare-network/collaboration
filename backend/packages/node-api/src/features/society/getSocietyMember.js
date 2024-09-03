const { getApis, getBlockApi } = require("@osn/polkadot-api-container");
const { chains } = require("../../constants");

async function getSocietyMemberFromOneApi(api, address, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);
  const societyMember = await blockApi.query.society.members(address);
  const data = societyMember.toJSON();
  return {
    data,
  };
}

async function getSocietyMemberFromApis(apis, address, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(getSocietyMemberFromOneApi(api, address, blockHashOrHeight));
  }

  return await Promise.any(promises);
}

async function getSocietyMember(ctx) {
  const { chain, address, blockHashOrHeight } = ctx.params;
  if (![chains.kusama].includes(chain)) {
    ctx.throw(400, `Not support chain ${chain}`);
  }

  const apis = getApis(chain);
  ctx.body = await getSocietyMemberFromApis(apis, address, blockHashOrHeight);
}

module.exports = {
  getSocietyMember,
};

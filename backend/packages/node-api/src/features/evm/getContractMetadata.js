const { evmChains } = require("../../constants");
const { queryMetadata } = require("./query/metadata");

async function getContractMetadata(ctx) {
  const { chain, contract } = ctx.params;
  if (!evmChains[chain]) {
    ctx.throw(400, `Invalid chain: ${chain}`);
    return;
  }

  try {
    ctx.body = await queryMetadata(chain, contract);
  } catch (e) {
    ctx.throw(500, e.message);
  }
}

module.exports = {
  getContractMetadata,
};

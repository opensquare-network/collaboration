const omit = require("lodash.omit");
const { getChainCollection } = require("../../mongo");

async function getChainsDefinition(ctx) {
  const chainCol = await getChainCollection();
  const chains = await chainCol.find({}).toArray();

  ctx.body = chains.map((item) => omit(item, ["_id"]));
}

module.exports = {
  getChainsDefinition,
};

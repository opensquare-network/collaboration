const omit = require("lodash.omit");
const { getChainTokenCollection } = require("../../mongo");

async function getChainTokens(ctx) {
  const { chain, type } = ctx.params;

  const chainTokenCol = await getChainTokenCollection();
  const tokens = await chainTokenCol.find({ chain, type }).toArray();

  ctx.body = tokens.map((item) => omit(item, ["_id", "chain", "type"]));
}

module.exports = {
  getChainTokens,
};

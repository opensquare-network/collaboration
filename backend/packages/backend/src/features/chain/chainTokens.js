const omit = require("lodash.omit");
const { getChainTokenCollection } = require("../../mongo");

async function getTokensDefinition(ctx) {
  const chainTokenCol = await getChainTokenCollection();
  const tokens = await chainTokenCol.find({}).toArray();

  ctx.body = tokens.map((item) => omit(item, ["_id"]));
}

module.exports = {
  getTokensDefinition,
};

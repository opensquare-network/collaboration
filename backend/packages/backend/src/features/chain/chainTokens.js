const { getChainTokenCollection } = require("../../mongo");

async function getTokensDefinition(ctx) {
  const chainTokenCol = await getChainTokenCollection();
  ctx.body = await chainTokenCol.find({}, { projection: { _id: 0 } }).toArray();
}

module.exports = {
  getTokensDefinition,
};

const { getChainCollection } = require("../../mongo");

async function getChainsDefinition(ctx) {
  const chainCol = await getChainCollection();
  ctx.body = await chainCol.find({}, { projection: { _id: 0 } }).toArray();
}

module.exports = {
  getChainsDefinition,
};

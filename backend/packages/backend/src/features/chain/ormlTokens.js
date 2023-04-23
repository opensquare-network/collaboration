const omit = require("lodash.omit");
const { getOrmlTokenCollection } = require("../../mongo");

async function getOrmlTokens(ctx) {
  const { chain } = ctx.params;

  const ormlTokenCol = await getOrmlTokenCollection();
  const ormlTokens = await ormlTokenCol.find({ chain }).toArray();

  ctx.body = ormlTokens.map((item) => omit(item, ["_id", "chain"]));
}

module.exports = {
  getOrmlTokens,
};

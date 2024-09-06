const {
  getSocietyMembersCount: _getSocietyMembersCount,
} = require("../../services/node.service/getSocietyMembersCount");

async function getSocietyMembersCount(ctx) {
  const { network, height } = ctx.params;
  ctx.body = await _getSocietyMembersCount(network, height);
}

module.exports = {
  getSocietyMembersCount,
};

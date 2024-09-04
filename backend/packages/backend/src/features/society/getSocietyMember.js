const {
  getSocietyMember: _getSocietyMember,
} = require("../../services/node.service/getSocietyMember");

async function getSocietyMember(ctx) {
  const { network, address } = ctx.params;
  ctx.body = await _getSocietyMember(network, address);
}

module.exports = {
  getSocietyMember,
};

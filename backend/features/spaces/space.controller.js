const { SPACES } = require("../../constants");

async function getSpaces(ctx) {
  ctx.body = SPACES;
}

module.exports = {
  getSpaces,
}
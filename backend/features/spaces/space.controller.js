const spaceServices = require("../../spaces");

const SPACES = Object.keys(spaceServices);

async function getSpaces(ctx) {
  ctx.body = SPACES;
}

module.exports = {
  getSpaces,
}

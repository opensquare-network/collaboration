const { pick } = require("lodash");
const { getAllSpaces } = require("../../spaces");

async function getAllNetworks(ctx) {
  const spaces = await getAllSpaces();

  const allNetworks = {};
  for (const space of spaces) {
    for (const network of space.networks || []) {
      allNetworks[network.network] = network;
    }
  }

  ctx.body = Object.values(allNetworks).map((item) =>
    pick(item, ["network", "ss58Format"]),
  );
}

module.exports = {
  getAllNetworks,
};

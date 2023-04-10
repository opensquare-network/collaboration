const { pick } = require("lodash");
const spaceService = require("../../services/space.service");
const { getAllSpaces } = require("../../spaces");

async function getSpaces(ctx) {
  ctx.body = await spaceService.getSpaces();
}

async function getSpace(ctx) {
  const { space } = ctx.params;
  ctx.body = await spaceService.getSpace(space);
}

async function getAllNetworks(ctx) {
  const spaces = await getAllSpaces();

  const allNetworks = {};
  for (const space of spaces) {
    for (const network of space.networks) {
      allNetworks[network.network] = network;
    }
  }

  ctx.body = Object.values(allNetworks).map((item) =>
    pick(item, ["network", "ss58Format"]),
  );
}

module.exports = {
  getSpace,
  getSpaces,
  getAllNetworks,
};

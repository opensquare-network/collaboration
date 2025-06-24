const { pick } = require("lodash");
const spaceService = require("../../services/space.service");
const { getAllSpaces } = require("../../spaces");
const { extractPage } = require("../../utils");
const { searchSpaces } = require("./searchSpaces");

async function getSpaces(ctx) {
  const { page, pageSize } = extractPage(ctx);
  const { search } = ctx.query;
  if (search) {
    ctx.body = await searchSpaces(search, page, pageSize);
    return;
  }

  const allSpaces = await spaceService.getSpaces();
  const items = allSpaces.slice((page - 1) * pageSize, page * pageSize);
  ctx.body = {
    items,
    page,
    pageSize,
    total: allSpaces.length,
  };
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

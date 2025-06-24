const spaceService = require("../../services/space.service");
const { extractPage } = require("../../utils");

async function getSpaces(ctx) {
  const { page, pageSize } = extractPage(ctx);
  const { search } = ctx.query;

  const allSpaces = await spaceService.getSpaces();

  let filteredItems = allSpaces;
  if (search) {
    filteredItems = allSpaces.filter((space) =>
      space.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const items = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  ctx.body = {
    items,
    page,
    pageSize,
    total: filteredItems.length,
  };
}

module.exports = {
  getSpaces,
};

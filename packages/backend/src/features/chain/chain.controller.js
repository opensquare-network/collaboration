const { fetchApi } = require("../../utils/fech.api");
const { NODE_API_ENDPOINT } = require("../../env");

async function getHeight(ctx) {
  const { chain } = ctx.params;
  const { time } = ctx.query;
  let url = `${NODE_API_ENDPOINT}/${chain}/chain/height?`;
  ctx.body = await fetchApi(url + new URLSearchParams({ time }));
}

module.exports = {
  getHeight,
};

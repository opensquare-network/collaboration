const { fetchApi } = require("../../utils/fech.api");
const { getEnvNodeApiEndpoint } = require("../../env");

async function getHeight(ctx) {
  const { chain } = ctx.params;
  const { time } = ctx.query;
  let url = `${getEnvNodeApiEndpoint()}/${chain}/chain/height?`;
  ctx.body = await fetchApi(url + new URLSearchParams({ time }));
}

module.exports = {
  getHeight,
};

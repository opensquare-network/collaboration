const fetch = require("node-fetch");
const { getEnvNodeApiEndpoint } = require("../../env");

async function getHeight(ctx) {
  const { chain } = ctx.params;
  const { time } = ctx.query;
  let url = `${getEnvNodeApiEndpoint()}/${chain}/chain/height?`;
  const response = await fetch(url + new URLSearchParams({ time }));
  const json = await response.json();
  ctx.body = json;
}

module.exports = {
  getHeight,
};

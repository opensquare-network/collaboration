const { NODE_API_ENDPOINT } = require("../../env");
const { fetchApi } = require("../../utils/fech.api");

async function getSocietyMember(network, address, height) {
  const url = `${NODE_API_ENDPOINT}/${network}/society/members/${address}/height/${height}`;
  return await fetchApi(url);
}

module.exports = {
  getSocietyMember,
};

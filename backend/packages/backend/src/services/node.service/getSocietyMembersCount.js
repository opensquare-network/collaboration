const { NODE_API_ENDPOINT } = require("../../env");
const { fetchApi } = require("../../utils/fech.api");

async function getSocietyMembersCount(network, height) {
  let url = `${NODE_API_ENDPOINT}/${network}/society/members/count`;
  if (height) {
    url = `${NODE_API_ENDPOINT}/${network}/society/members/count/height/${height}`;
  }
  return await fetchApi(url);
}

module.exports = {
  getSocietyMembersCount,
};

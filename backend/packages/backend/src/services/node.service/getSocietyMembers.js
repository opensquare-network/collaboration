const { NODE_API_ENDPOINT } = require("../../env");
const { fetchApi } = require("../../utils/fech.api");

async function getSocietyMembers(network, height) {
  let url = `${NODE_API_ENDPOINT}/${network}/society/members`;
  if (height) {
    url = `${NODE_API_ENDPOINT}/${network}/society/members/height/${height}`;
  }
  return await fetchApi(url);
}

module.exports = {
  getSocietyMembers,
};

const { NODE_API_ENDPOINT } = require("../../env");
const { isTestAccount } = require("../../utils");
const { fetchApi } = require("../../utils/fech.api");

async function getSocietyMember(network, address, height) {
  if (isTestAccount(address)) {
    return {
      data: {
        rank: 0,
        strikes: 10,
        vouching: null,
        index: 0,
      },
    };
  }
  let url = `${NODE_API_ENDPOINT}/${network}/society/members/${address}`;
  if (height) {
    url = `${NODE_API_ENDPOINT}/${network}/society/members/${address}/height/${height}`;
  }
  return await fetchApi(url);
}

module.exports = {
  getSocietyMember,
};

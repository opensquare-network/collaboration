const { ipfsAddBuffer, ipfsAddJson } = require("./ipfs");

async function pinJsonToIpfs(json) {
  const { path } = await ipfsAddJson(json);
  return path;
}

async function pinFileToIpfs(file) {
  const { path } = await ipfsAddBuffer(file.buffer);
  return path;
}

module.exports = {
  pinFileToIpfs,
  pinJsonToIpfs,
};

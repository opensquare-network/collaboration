async function pinJsonToIpfs(buf, cid) {
  console.log(`Use mock pinJsonToIpfs`)
  return {
    PinHash: cid,
  };
}

module.exports = {
  pinJsonToIpfs,
};

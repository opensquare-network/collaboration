const Hash = require("ipfs-only-hash");
const { CID } = require("multiformats/cid");
const { getClients, ClientOptions, ClientMode } = require("@osn/ipfs");
const {
  INFURA_PROJECT_ID,
  INFURA_PROJECT_SECRET,
  LOCAL_IPFS_NODE_URL,
  USE_LOCAL_IFPS_NODE,
} = require("../../env");

let ipfsClient;

async function getIpfsClient() {
  if (!ipfsClient) {
    [ipfsClient] = await getClients(
      USE_LOCAL_IFPS_NODE ? ClientMode.Local : ClientMode.Infura,
      new ClientOptions(
        INFURA_PROJECT_ID,
        INFURA_PROJECT_SECRET,
        LOCAL_IPFS_NODE_URL,
      ),
    );
  }

  return ipfsClient;
}

async function ipfsAddJson(data) {
  const ipfsClient = await getIpfsClient();
  const added = await ipfsClient.add(JSON.stringify(data));
  return added;
}

async function ipfsAddBuffer(data) {
  const ipfsClient = await getIpfsClient();
  const added = await ipfsClient.add(data);
  return added;
}

async function cidOf(obj) {
  const data = JSON.stringify(obj);
  const cidV0 = await Hash.of(Buffer.from(data));
  const cid = CID.parse(cidV0);
  return cid.toV1().toString();
}

module.exports = {
  cidOf,
  ipfsAddJson,
  ipfsAddBuffer,
};

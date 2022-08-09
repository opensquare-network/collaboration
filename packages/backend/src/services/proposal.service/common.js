const {
  getObjectBufAndCid,
  pinJsonToIpfsWithTimeout,
} = require("../ipfs.service");

const status = Object.freeze({
  terminated: "terminated",
  pending: "pending",
  active: "active",
  closed: "closed",
});

function getProposalStatus(proposal = {}) {
  const { terminated, startDate, endDate } = proposal;
  if (terminated) {
    return status.terminated;
  }

  const now = Date.now();
  if (now < startDate) {
    return status.pending;
  } else if (now < endDate) {
    return status.active;
  } else {
    return status.closed;
  }
}

async function pinData(data, address, signature) {
  const toBePin = {
    msg: JSON.stringify(data),
    address,
    signature,
    version: "1",
  };

  const { cid } = await getObjectBufAndCid(toBePin);

  let pinHash = null;
  try {
    pinHash = await pinJsonToIpfsWithTimeout(toBePin, 3000);
  } catch (e) {
    console.error(e);
  }

  return { cid, pinHash };
}

module.exports = {
  getProposalStatus,
  pinData,
};

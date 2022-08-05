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

async function pinData(data, address, signature, prefix) {
  const { buf, cid } = await getObjectBufAndCid({
    msg: JSON.stringify(data),
    address,
    signature,
    version: "1",
  });

  let pinHash = null;
  try {
    pinHash = await pinJsonToIpfsWithTimeout(buf, cid, 3000, prefix);
  } catch (e) {
    console.error(e);
  }

  return { cid, pinHash };
}

module.exports = {
  getProposalStatus,
  pinData,
};

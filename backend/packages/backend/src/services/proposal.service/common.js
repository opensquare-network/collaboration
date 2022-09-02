const {
  getObjectBufAndCid,
  pinJsonToIpfsWithTimeout,
} = require("../ipfs.service");
const { enhancedSqrtOfBalance } = require("../../utils");
const { getProposalCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { spaces: spaceServices } = require("../../spaces");

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

const calcWeights = (vote, decimals, voteThreshold) => {
  return {
    ...vote,
    weights: {
      balanceOf: vote.weights.balanceOf?.toString(),
      quadraticBalanceOf: enhancedSqrtOfBalance(
        vote.weights.balanceOf?.toString(),
        decimals,
        voteThreshold
      ),
      details: vote.weights.details,
    },
  };
};

async function getProposalSpace(proposal) {
  const spaceService = spaceServices[proposal.space];
  if (!spaceService) {
    throw new HttpError(500, "Unkown space");
  }
  return spaceService;
}

async function getProposalSpaceByCid(proposalCid) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(404, "Proposal does not exists");
  }
  const spaceService = spaceServices[proposal.space];
  if (!spaceService) {
    throw new HttpError(500, "Unkown space");
  }
  return spaceService;
}

module.exports = {
  getProposalStatus,
  pinData,
  calcWeights,
  getProposalSpace,
  getProposalSpaceByCid,
};

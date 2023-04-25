const {
  getObjectBufAndCid,
  pinJsonToIpfsWithTimeout,
} = require("../ipfs.service");
const { enhancedSqrtOfBalance } = require("../../utils");
const { getProposalCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { spaces: spaceServices } = require("../../spaces");
const { createNotification } = require("../notification");
const { getSpaceMembers } = require("../spaceMember");
const { logger } = require("../../utils/logger");

const ProposalStatus = Object.freeze({
  Terminated: "terminated",
  Pending: "pending",
  Active: "active",
  CloseToEnd: "closeToEnd",
  Closed: "closed",
});

function getProposalStatus(proposal = {}) {
  const { terminated, startDate, endDate } = proposal;
  if (terminated) {
    return ProposalStatus.Terminated;
  }

  const now = Date.now();
  if (now < startDate) {
    return ProposalStatus.Pending;
  } else if (now < endDate) {
    return ProposalStatus.Active;
  } else {
    return ProposalStatus.Closed;
  }
}

async function pinData(rawData) {
  const toBePin = {
    ...rawData,
    // version 2: replace `msg` with `data`
    version: "2",
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

const calcWeights = (vote, decimals) => {
  return {
    ...vote,
    weights: {
      balanceOf: vote.weights.balanceOf?.toString(),
      quadraticBalanceOf: enhancedSqrtOfBalance(
        vote.weights.balanceOf?.toString(),
        decimals,
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

async function createSpaceNotifications(space, notificationType, data) {
  const members = await getSpaceMembers(space);

  for (const member of members) {
    const receiver = member.memberPublicKey;

    try {
      await createNotification(receiver, notificationType, data);
    } catch (e) {
      logger.error(
        `Failed to create notification for ${receiver}, notificationType: ${notificationType}, error: ${e.message}`,
      );
    }
  }
}

module.exports = {
  ProposalStatus,
  getProposalStatus,
  pinData,
  calcWeights,
  getProposalSpace,
  getProposalSpaceByCid,
  createSpaceNotifications,
};

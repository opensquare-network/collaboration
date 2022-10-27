const dotenv = require("dotenv");
dotenv.config();

const {
  getProposalCollection,
  getNotificationCollection,
  getSpaceMemberCollection,
} = require("../mongo");
const {
  getProposalStatus,
  ProposalStatus,
} = require("../services/proposal.service/common");

const EventType = {
  ProposalStarted: "proposalStarted",
  ProposalCloseToEnd: "proposalCloseToEnd",
  ProposalEnd: "proposalEnd",
  ProposalTerminated: "proposalTerminated",
};

function getEventTypeFromProposalStatus(proposalStatus) {
  let eventType = "";

  if (proposalStatus === ProposalStatus.Active) {
    eventType = EventType.ProposalStarted;
  } else if (proposalStatus === "closeToEnd") {
    eventType = EventType.ProposalCloseToEnd;
  } else if (proposalStatus === ProposalStatus.Closed) {
    eventType = EventType.ProposalEnd;
  } else if (proposalStatus === ProposalStatus.Terminated) {
    eventType = EventType.ProposalTerminated;
  }

  return eventType;
}

async function createNotificationForSpaceMembers(space, eventType, data) {
  // Find members those should be notified
  const spaceMemberCol = await getSpaceMemberCollection();
  const members = await spaceMemberCol
    .find({ space })
    .toArray();

  if (members.length === 0) {
    return;
  }

  const notificationCol = await getNotificationCollection();
  const bulk = notificationCol.initializeUnorderedBulkOp();
  for (const member of members) {
    // Create notification
    bulk.insert({
      owner: member.memberPublicKey,
      type: eventType,
      read: false,
      createdAt: Date.now(),
      data,
    });
  }
  await bulk.execute();
}

async function createNotification(proposal, proposalStatus) {
  const eventType = getEventTypeFromProposalStatus(proposalStatus);
  if (!eventType) {
    return;
  }

  const data = {
    proposalCid: proposal.cid,
    title: proposal.title,
    space: proposal.space,
  };
  await createNotificationForSpaceMembers(proposal.space, eventType, data);

  // Update proposal status
  const proposalCol = await getProposalCollection();
  await proposalCol.updateOne(
    { _id: proposal._id },
    { $set: { status: proposalStatus } }
  );
}

async function handleProposal(proposal) {
  const status = getProposalStatus(proposal);

  if (proposal.status === status && status !== ProposalStatus.Active) {
    return;
  }

  if (proposal.status === "closeToEnd" && status === ProposalStatus.Active) {
    return;
  }

  if (status === ProposalStatus.Active) {
    // Check if close to end
    const now = Date.now();
    if (now > proposal.endDate - 24 * 3600 * 1000) {
      return await createNotification(proposal, "closeToEnd");
    }
  }

  return await createNotification(status);
}

async function startNotify() {
  const proposalCol = await getProposalCollection();
  const proposals = await proposalCol.find().toArray();

  for (const proposal of proposals) {
    try {
      await handleProposal(proposal);
    } catch (e) {
      console.error(e.message);
    }
  }
}

async function main() {
  console.log(`Last pin at:`, new Date());

  try {
    await startNotify();
  } catch (e) {
    console.error(e.message);
  }
}

main()
  .catch(console.error)
  .then(() => process.exit());

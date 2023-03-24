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

async function updateProposalStatus(proposalId, status) {
  const proposalCol = await getProposalCollection();
  await proposalCol.updateOne({ _id: proposalId }, { $set: { status } });
}

function getEventTypeFromProposalStatus(proposalStatus) {
  let eventType = "";

  if (proposalStatus === ProposalStatus.Active) {
    eventType = EventType.ProposalStarted;
  } else if (proposalStatus === ProposalStatus.CloseToEnd) {
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
  const members = await spaceMemberCol.find({ space }).toArray();

  if (members.length === 0) {
    return;
  }

  const notificationCol = await getNotificationCollection();
  const bulk = notificationCol.initializeUnorderedBulkOp();
  for (const member of members) {
    // Create notification
    bulk.insert({
      owner: member.member,
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
  let status = getProposalStatus(proposal);
  const currentStatus = proposal.status || ProposalStatus.Pending;

  // If the current status is the same as the new status, do nothing
  // Except for the active status, which can be changed to closeToEnd
  if (currentStatus === status && status !== ProposalStatus.Active) {
    return;
  }

  // If the current status is closeToEnd and the new status is active, do nothing
  if (
    currentStatus === ProposalStatus.CloseToEnd &&
    status === ProposalStatus.Active
  ) {
    return;
  }

  if (status === ProposalStatus.Active) {
    // Check if the proposal is close to end
    const now = Date.now();
    if (now > proposal.endDate - 24 * 3600 * 1000) {
      status = ProposalStatus.CloseToEnd;
    }
  }

  await updateProposalStatus(proposal._id, status);
  await createNotification(proposal, status);
}

async function startNotify() {
  const proposalCol = await getProposalCollection();

  //TODO: handle proposals with a limited number
  const proposals = await proposalCol
    .find({
      status: {
        $nin: [ProposalStatus.Closed, ProposalStatus.Terminated],
      },
    })
    .toArray();

  for (const proposal of proposals) {
    try {
      await handleProposal(proposal);
    } catch (e) {
      console.error(e.message);
    }
  }
}

async function main() {
  console.log(`Last send notification at:`, new Date());

  try {
    await startNotify();
  } catch (e) {
    console.error(e.message);
  }
}

main()
  .catch(console.error)
  .then(() => process.exit());

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

async function createNotification(status, eventType) {
  const proposalCol = await getProposalCollection();
  const notificationCol = await getNotificationCollection();
  const spaceMemberCol = await getSpaceMemberCollection();

  // Find members those should be notified
  const members = await spaceMemberCol
    .find({ space: proposal.space })
    .toArray();

  for (const member of members) {
    // Create notification
    await notificationCol.insertOne({
      owner: member.memberPublicKey,
      type: eventType,
    });

    // Update proposal status
    await proposalCol.updateOne({ _id: proposal._id }, { $set: { status } });
  }
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
      return await createNotification("closeToEnd", EventType.ProposalCloseToEnd);
    }

    return await createNotification(status, EventType.ProposalStarted);
  }

  if (status === ProposalStatus.Closed) {
    return await createNotification(status, EventType.ProposalEnd);
  }

  if (status === ProposalStatus.Terminated) {
    return await createNotification(status, EventType.ProposalTerminated);
  }
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

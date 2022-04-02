const dotenv = require("dotenv");
dotenv.config();

const {
  getSpaceCollection,
  getProposalCollection,
  getVoteCollection,
  getCommentCollection,
} = require("../mongo");

async function migrateSpaces() {
  const spaceCol = await getSpaceCollection();
  const spaces = await spaceCol.find({}).toArray();
  for (const space of spaces) {
    if (space.version) {
      console.log(`Space ${space.id} has already migrated`);
      continue;
    }

    spaceCol.updateOne(
      { id: space.id },
      {
        $set: {
          version: "2",
          networks: [
            {
              network: space.network,
              ss58Format: space.ss58Format,
              ...(
                space.assetId
                ? {
                  type: "asset",
                  assetId: space.assetId,
                }
                : {}
              ),
            }
          ],
        },
        $unset: {
          network: true,
          ss58Format: true,
          identity: true,
          assetId: true,
        },
      }
    );
  }
}

async function migrateProposals() {
  const spaceCol = await getSpaceCollection();
  const proposalCol = await getProposalCollection();
  const spaces = await spaceCol.find({}).toArray();
  const proposals = await proposalCol.find({}).toArray();
  for (const proposal of proposals) {
    const space = spaces.find(space => space.id === proposal.space);
    if (!space) {
      console.log(`Space ${proposal.space} not found`);
      continue;
    }

    const networksConfig = {
      symbol: space.symbol,
      decimals: space.decimals,
      networks: space.networks,
    };

    if (!space.version) {
      console.log(`Space ${proposal.space} has not migrated yet`);
      continue;
    }
    const spaceNetwork = space.networks?.[0]?.network;
    if (!spaceNetwork) {
      console.log(`Space ${proposal.space} network not found`);
      continue;
    }

    if (proposal.version) {
      console.log(`Proposal ${proposal.cid} has already migrated`);
      continue;
    }

    await proposalCol.updateOne(
      { cid: proposal.cid },
      {
        $set: {
          networksConfig,
          snapshotHeights: {
            [spaceNetwork]: proposal.snapshotHeight,
          },
          proposerNetwork: spaceNetwork,
          version: "2",
        },
        $unset: {
          snapshotHeight: true,
        }
      }
    );
  }
}

async function migrateVotes() {
  const proposalCol = await getProposalCollection();
  const voteCol = await getVoteCollection();
  const proposals = await proposalCol.find({}).toArray();
  const votes = await voteCol.find({}).toArray();
  for (const vote of votes) {
    const proposal = proposals.find(p => p._id.toString() === vote.proposal.toString());
    if (!proposal) {
      console.log(`Proposal for ${vote.cid} not found`);
      continue;
    }
    if (!proposal.version) {
      console.log(`Proposal ${proposal.cid} has not migrated yet`);
      continue;
    }
    const proposalNetwork = Object.keys(proposal.snapshotHeights || {})?.[0];
    if (!proposalNetwork) {
      console.log(`Proposal ${proposal.cid} network not found`);
      continue;
    }

    if (vote.version) {
      console.log(`Vote ${vote.cid} has already migrated`);
      continue;
    }

    await voteCol.updateOne(
      { cid: vote.cid },
      {
        $set: {
          version: "2",
          voterNetwork: proposalNetwork,
        },
      }
    );
  }
}

async function migrateComments() {
  const proposalCol = await getProposalCollection();
  const commentCol = await getCommentCollection();
  const proposals = await proposalCol.find({}).toArray();
  const comments = await commentCol.find({}).toArray();
  for (const comment of comments) {
    const proposal = proposals.find(p => p._id.toString() === comment.proposal.toString());
    if (!proposal) {
      console.log(`Proposal for ${comment.cid} not found`);
      continue;
    }
    if (!proposal.version) {
      console.log(`Proposal ${proposal.cid} has not migrated yet`);
      continue;
    }
    const proposalNetwork = Object.keys(proposal.snapshotHeights || {})?.[0];
    if (!proposalNetwork) {
      console.log(`Proposal ${proposal.cid} network not found`);
      continue;
    }

    if (comment.version) {
      console.log(`Comment ${comment.cid} has already migrated`);
      continue;
    }

    await commentCol.updateOne(
      { cid: comment.cid },
      {
        $set: {
          version: "2",
          commenterNetwork: proposalNetwork,
        },
      }
    );
  }
}

async function main() {
  await migrateSpaces();
  await migrateProposals();
  await migrateVotes();
  await migrateComments();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));

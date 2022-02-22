const dotenv = require("dotenv");
dotenv.config();

const {
  getSpaceCollection,
  getProposalCollection,
} = require("../mongo");

async function migrateSpaces() {
  const spaceCol = await getSpaceCollection();
  const spaces = await spaceCol.find({}).toArray();
  if (!spaces.some(space => !space.version)) {
    console.log("All spaces have version");
    return;
  }

  const bulk = spaceCol.initializeUnorderedBulkOp();
  for (const space of spaces) {
    if (!space.version) {
      continue;
    }

    bulk
      .find({ id: space.id })
      .upsert()
      .update({
        $set: {
          version: "2",
          id: space.id,
          name: space.name,
          symbol: space.symbol,
          decimals: space.decimals,
          networks: [
            {
              network: space.network,
              ss58Format: space.ss58Format,
              identity: space.identity,
            }
          ],
          proposeThreshold: space.proposeThreshold,
          voteThreshold: space.voteThreshold,
          weightStrategy: space.weightStrategy,
        },
        $unset: {
          network: ture,
          ss58Format: ture,
          identity: ture,
        },
      });
  }
  await bulk.execute();
}

async function migrateProposals() {
  const spaceCol = await getSpaceCollection();
  const proposalCol = await getProposalCollection();
  const spaces = await spaceCol.find({}).toArray();
  const proposals = await proposalCol.find({}).toArray();
  for (const proposal of proposals) {
    const space = spaces.find(space => space.id === proposal.sapce);
    if (!space) {
      console.log(`Space ${proposal.space} not found`);
      continue;
    }
    if (!space.version) {
      console.log(`Space ${proposal.space} has not migrated yet`);
      continue;
    }
    if (proposal.version) {
      console.log(`Proposal ${proposal.id} has already migrated`);
      continue;
    }
  }
}

async function main() {
  await migrateSpaces();
  await migrateProposals();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));

const dotenv = require("dotenv");
dotenv.config();

const { getVoteCollection } = require("../mongo");

async function migrateVotes() {
  const voteCol = await getVoteCollection();
  const votes = await voteCol.find({}).toArray();
  for (const vote of votes) {
    if (vote.version !== "2") {
      continue;
    }
    await voteCol.updateOne(
      { cid: vote.cid },
      {
        $set: {
          choices: [vote.choice],
          version: "3",
        },
      }
    );
    console.log(`Migrated vote: ${vote.cid}`);
  }
}

async function main() {
  await migrateVotes();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));

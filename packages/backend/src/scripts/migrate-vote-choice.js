const dotenv = require("dotenv");
dotenv.config();

const { getVoteCollection } = require("../mongo");

async function migrateVotes() {
  const voteCol = await getVoteCollection();
  const votes = await voteCol.find({}).toArray();
  for (const vote of votes) {
    await voteCol.updateOne(
      { cid: vote.cid },
      {
        $set: {
          choices: [vote.choice],
          version: "3",
        },
      }
    );
  }
}

async function main() {
  await migrateVotes();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));

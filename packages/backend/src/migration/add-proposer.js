const dotenv = require('dotenv');
dotenv.config();

const { getProposalCollection } = require("../mongo");

async function main() {
  const collection = await getProposalCollection();
  const proposals = await collection.find({ proposer: null }).toArray();

  for (const proposal of proposals) {
    console.log(`Updating proposal ${proposal._id}`);
    await collection.updateOne(
      { _id: proposal._id },
      { $set: { proposer: proposal.address } }
    );
  }
}

main()
  .catch(console.error)
  .then(() => process.exit());


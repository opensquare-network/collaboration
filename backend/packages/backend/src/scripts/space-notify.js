const dotenv = require("dotenv");
dotenv.config();

const {
  getProposalCollection,
} = require("../mongo");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function handleProposal(proposal) {

}

async function startNotify() {
  const proposalCol = await getProposalCollection();
  const proposals = await proposalCol.find().toArray();

  for (const proposal of proposals) {
    await handleProposal(proposal);
  }
}

async function main() {
  while (true) {
    try {
      await startNotify();
      console.log(`Last pin at:`, new Date());
    } catch (e) {
      console.error(e);
    }

    await sleep(30 * 1000);
  }
}

main();

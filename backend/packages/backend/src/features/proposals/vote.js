const { ChoiceType } = require("../../constants");
const { HttpError } = require("../../exc");
const { getProposalCollection } = require("../../mongo");
const proposalService = require("../../services/proposal.service");
const { spaces: spaceServices } = require("../../spaces");

function checkVoteChoices(choices, proposal) {
  if (!choices) {
    throw new HttpError(400, { choices: ["Choices is missing"] });
  }

  if (
    !Array.isArray(choices) ||
    choices.length < 1 ||
    choices.some((item) => typeof item !== "string")
  ) {
    throw new HttpError(400, {
      choices: ["Choices must be array of string with at least 1 items"],
    });
  }

  if (proposal.choiceType === ChoiceType.Single && choices.length !== 1) {
    throw new HttpError(400, "Can vote single choice only");
  }

  for (const choice of choices) {
    if (!proposal.choices?.includes(choice)) {
      throw new HttpError(400, `Invalid choice: ${choice}`);
    }
  }
}

function checkProposal(proposal) {
  const now = new Date();

  if (proposal.startDate > now.getTime()) {
    throw new HttpError(400, "The voting is not started yet");
  }

  if (proposal.endDate < now.getTime()) {
    throw new HttpError(400, "The voting had already ended");
  }
}

function checkVoterNetwork(voterNetwork, proposal) {
  if (!voterNetwork) {
    throw new HttpError(400, { voterNetwork: ["Voter network is missing"] });
  }

  const space = proposal.space;
  const spaceService = spaceServices[space];
  if (!spaceService) {
    throw new HttpError(500, "Unknown space");
  }

  const snapshotNetworks = Object.keys(proposal.snapshotHeights);
  if (!snapshotNetworks.includes(voterNetwork)) {
    throw new HttpError(400, "Voter network is not supported by this proposal");
  }
}

async function vote(ctx) {
  const { data, address, signature } = ctx.request.body;
  const { proposalCid, choices, remark, realVoter, voterNetwork } = data;

  if (!proposalCid) {
    throw new HttpError(400, { proposalCid: ["Proposal CID is missing"] });
  }
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  checkProposal(proposal);
  checkVoteChoices(choices, proposal);
  checkVoterNetwork(voterNetwork, proposal);

  ctx.body = await proposalService.vote(
    proposalCid,
    choices,
    remark,
    realVoter,
    data,
    address,
    voterNetwork,
    signature,
  );
}

module.exports = {
  vote,
};
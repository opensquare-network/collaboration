const isNil = require("lodash.isnil");
const { ChoiceType } = require("../../constants");
const { SpaceType } = require("../../consts/space");
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

  if (proposal.networksConfig?.type === SpaceType.CollectivesDao) {
    return;
  }

  const networks = proposal.networksConfig?.networks || [];
  if (!networks.find((item) => item.network === voterNetwork)) {
    throw new HttpError(400, "Voter network is not supported by this proposal");
  }
}

function checkRemark(remark, remarkType) {
  if (isNil(remark)) {
    return;
  }

  if (typeof remark !== "string") {
    throw new HttpError(400, { remark: ["Remark must be a string"] });
  }

  if (!isNil(remarkType) && remarkType !== "markdown") {
    throw new HttpError(400, "Invalid remark type");
  }
}

async function vote(ctx) {
  const { data, address, signature } = ctx.request.body;
  const { proposalCid, choices, remark, remarkType, realVoter, voterNetwork } =
    data;

  checkRemark(remark, remarkType);

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
    remarkType,
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

const { HttpError } = require("../../exc");
const proposalService = require("../../services/proposal.service");

async function vote(ctx) {
  const { data, address, signature } = ctx.request.body;
  const { proposalCid, choices, remark, realVoter, voterNetwork } = data;

  if (!proposalCid) {
    throw new HttpError(400, { proposalCid: ["Proposal CID is missing"] });
  }

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

  if (!voterNetwork) {
    throw new HttpError(400, { voterNetwork: ["Voter network is missing"] });
  }

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

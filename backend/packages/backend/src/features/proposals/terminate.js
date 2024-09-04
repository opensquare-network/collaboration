const { HttpError } = require("../../exc");
const proposalService = require("../../services/proposal.service");

async function terminate(ctx) {
  const { data, address, signature } = ctx.request.body;
  const { proposalCid, action, terminatorNetwork } = data;

  if (action !== "terminate") {
    throw new HttpError(400, { action: ['Action must be "terminate"'] });
  }

  if (!proposalCid) {
    throw new HttpError(400, { proposalCid: ["Proposal CID is missing"] });
  }

  if (!terminatorNetwork) {
    throw new HttpError(400, {
      terminatorNetwork: ["Terminator network is missing"],
    });
  }

  ctx.body = await proposalService.terminate(
    proposalCid,
    terminatorNetwork,
    data,
    address,
    signature,
  );
}

module.exports = {
  terminate,
};

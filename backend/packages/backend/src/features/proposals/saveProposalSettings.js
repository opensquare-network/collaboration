const { HttpError } = require("../../exc");
const { getProposalTemplateCollection } = require("../../mongo");
const { isAdmin } = require("../../utils/admin");
const { checkProposalContent } = require("./checkProposalContent");

async function saveProposalSettings(ctx) {
  const { data, address } = ctx.request.body;
  const { space, proposalTemplate = {} } = data;
  const { title, content, contentType } = proposalTemplate;

  if (!isAdmin(space, address)) {
    throw new HttpError(403, { address: ["Only admins can change settings"] });
  }

  if (!space) {
    throw new HttpError(400, { space: ["Space is missing"] });
  }

  checkProposalContent(proposalTemplate);

  const proposalTemplateCol = await getProposalTemplateCollection();
  await proposalTemplateCol.updateOne(
    { space },
    { $set: { title, content, contentType } },
    { upsert: true },
  );

  ctx.body = { success: true };
}

module.exports = {
  saveProposalSettings,
};

const { getProposalTemplateCollection } = require("../../mongo");

async function getProposalSettings(ctx) {
  const { space } = ctx.params;

  const proposalTemplateCol = await getProposalTemplateCollection();
  const proposalTemplate = await proposalTemplateCol.findOne({ space });

  ctx.body = {
    space,
    proposalTemplate,
  };
}

module.exports = {
  getProposalSettings,
};

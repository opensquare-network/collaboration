const { ContentType } = require("../../constants");
const { HttpError } = require("../../exc");
const { getProposalTemplateCollection } = require("../../mongo");
const { isAdmin } = require("../../utils/admin");

async function saveProposalSettings(ctx) {
  const { data, address } = ctx.request.body;
  const { space, proposalTemplate: { title, content, contentType } = {} } =
    data;

  if (!isAdmin(address)) {
    throw new HttpError(403, { address: ["Only admin can modify settings"] });
  }

  if (!space) {
    throw new HttpError(400, { space: ["Space is missing"] });
  }

  if (!title) {
    throw new HttpError(400, { title: ["Title is missing"] });
  }

  if (!content) {
    throw new HttpError(400, { content: ["Content is missing"] });
  }

  if (!contentType) {
    throw new HttpError(400, { contentType: ["Content type is missing"] });
  }

  if (
    contentType !== ContentType.Markdown &&
    contentType !== ContentType.Html
  ) {
    throw new HttpError(400, { contentType: ["Invalid content type"] });
  }

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

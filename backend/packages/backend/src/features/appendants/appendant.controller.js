const { HttpError } = require("../../exc");
const appendantService = require("../../services/appendant.service");
const { ContentType } = require("../../constants");

async function addAppendant(ctx) {
  const { data, address, signature } = ctx.request.body;
  const { proposalCid, content, contentType, appenderNetwork } = data;

  if (!proposalCid) {
    throw new HttpError(400, { proposalCid: ["Proposal CID is missing"] });
  }

  if (!content) {
    throw new HttpError(400, { content: ["Content is missing"] });
  }

  if (!appenderNetwork) {
    throw new HttpError(400, {
      appenderNetwork: ["Appender network is missing"],
    });
  }

  if (
    contentType !== ContentType.Markdown &&
    contentType !== ContentType.Html
  ) {
    throw new HttpError(400, { contentType: ["Unknown content type"] });
  }

  ctx.body = await appendantService.addAppendant(
    proposalCid,
    content,
    contentType,
    appenderNetwork,
    data,
    address,
    signature,
  );
}

module.exports = {
  addAppendant,
};

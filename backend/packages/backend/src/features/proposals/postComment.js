const { HttpError } = require("../../exc");
const proposalService = require("../../services/proposal.service");
const { ContentType } = require("../../constants");

async function postComment(ctx) {
  const { data, address, signature } = ctx.request.body;
  const { proposalCid, content, contentType, commenterNetwork } = data;

  if (!content) {
    throw new HttpError(400, { content: ["Comment content is missing"] });
  }

  if (
    contentType !== ContentType.Markdown &&
    contentType !== ContentType.Html
  ) {
    throw new HttpError(400, { contentType: ["Unknown content type"] });
  }

  if (!commenterNetwork) {
    throw new HttpError(400, {
      commenterNetwork: ["Commenter network is missing"],
    });
  }

  ctx.body = await proposalService.postComment(
    proposalCid,
    content,
    contentType,
    commenterNetwork,
    data,
    address,
    signature,
  );
}

module.exports = {
  postComment,
};

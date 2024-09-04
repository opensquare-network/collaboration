const { HttpError } = require("../../exc");
const { ContentType, PostTitleLengthLimitation } = require("../../constants");

function checkProposalContent(data) {
  const { title, content, contentType } = data;

  if (!title) {
    throw new HttpError(400, { title: ["Title is missing"] });
  }

  if (title.length > PostTitleLengthLimitation) {
    throw new HttpError(400, {
      title: ["Title must be no more than %d characters"],
    });
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
}

module.exports = {
  checkProposalContent,
};

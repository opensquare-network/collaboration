const { HttpError } = require("../../exc");
const postService = require("../../services/post.service");
const { ContentType, ChoiceType } = require("../../constants");
const { extractPage } = require("../../utils");

async function createPost(ctx) {
  const {
    data,
    address,
    signature,
  } = ctx.request.body;
  const {
    space,
    title,
    content,
    contentType,
    choiceType,
    startDate,
    endDate,
    snapshotHeight,
  } = data;

  if (!title) {
    throw new HttpError(400, { title: ["Title is missing"] });
  }

  if (!content) {
    throw new HttpError(400, { content: ["Content is missing"] });
  }

  if (!choiceType) {
    throw new HttpError(400, { content: ["Choice type is missing"] });
  }

  if (!startDate) {
    throw new HttpError(400, { content: ["Start date is missing"] });
  }

  if (!endDate) {
    throw new HttpError(400, { content: ["End date is missing"] });
  }

  if (snapshotHeight === undefined) {
    throw new HttpError(400, { content: ["Snapshot height is missing"] });
  }

  if (choiceType !== ChoiceType.Single) {
    throw new HttpError(400, { choiceType: ["Unknown choice type"] });
  }

  if (
    contentType !== ContentType.Markdown &&
    contentType !== ContentType.Html
  ) {
    throw new HttpError(400, { contentType: ["Unknown content type"] });
  }

  ctx.body = await postService.createPost(
    space,
    title,
    content,
    contentType,
    choiceType,
    startDate,
    endDate,
    snapshotHeight,
    data,
    address,
    signature,
    ctx.cid,
    ctx.pinHash,
  );
}

async function getPosts(ctx) {
  const { space } = ctx.params;

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  ctx.body = await postService.getPostsBySpace(space, page, pageSize);
}

async function getPostById(ctx) {
  const { postId } = ctx.params;

  ctx.body = await postService.getPostById(postId);
}

async function postComment(ctx) {
  const {
    data,
    address,
    signature,
  } = ctx.request.body;
  const {
    proposalCid,
    content,
    contentType
  } = data;

  if (!content) {
    throw new HttpError(400, { content: ["Comment content is missing"] });
  }

  if (
    contentType !== ContentType.Markdown &&
    contentType !== ContentType.Html
  ) {
    throw new HttpError(400, { contentType: ["Unknown content type"] });
  }

  ctx.body = await postService.postComment(
    proposalCid,
    content,
    contentType,
    data,
    address,
    signature,
    ctx.cid,
    ctx.pinHash,
  );
}

async function getComments(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  const { chain, postId } = ctx.params;
  ctx.body = await postService.getComments(chain, postId, page, pageSize);
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  postComment,
  getComments,
};

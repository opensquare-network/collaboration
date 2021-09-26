const { HttpError } = require("../../exc");
const postService = require("../../services/post.service");
const { ContentType } = require("../../constants");
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
    contentType: paramContentType,
  } = data;

  if (!title) {
    throw new HttpError(400, { title: ["Post title is missing"] });
  }

  if (!content) {
    throw new HttpError(400, { content: ["Post content is missing"] });
  }

  if (
    paramContentType !== undefined &&
    paramContentType !== ContentType.Markdown &&
    paramContentType !== ContentType.Html
  ) {
    throw new HttpError(400, { contentType: ["Unknown content type"] });
  }

  const contentType = paramContentType
    ? paramContentType
    : ContentType.Markdown;

  ctx.body = await postService.createPost(
    space,
    title,
    content,
    contentType,
    data,
    address,
    signature,
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

  ctx.body = await postService.getPostsByChain(space, page, pageSize);
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
    postId,
    content,
    contentType: paramContentType
  } = data;

  if (!content) {
    throw new HttpError(400, { content: ["Comment content is missing"] });
  }

  if (
    paramContentType !== undefined &&
    paramContentType !== ContentType.Markdown &&
    paramContentType !== ContentType.Html
  ) {
    throw new HttpError(400, { contentType: ["Unknown content type"] });
  }

  const contentType = paramContentType
    ? paramContentType
    : ContentType.Markdown;

  ctx.body = await postService.postComment(
    postId,
    content,
    contentType,
    data,
    address,
    signature,
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

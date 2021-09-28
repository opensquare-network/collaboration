const Router = require("koa-router");
const postController = require("./proposal.controller");
const requireSignature = require("../../middleware/require-signature");

const router = new Router();

router.post("/proposals", requireSignature, postController.createPost);
router.post("/comments", requireSignature, postController.postComment);

router.get("/proposals", postController.getPosts);
router.get("/proposals/:postId", postController.getPostById);
router.get("/proposals/:postId/comments", postController.getComments);

module.exports = router;

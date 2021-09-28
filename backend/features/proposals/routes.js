const Router = require("koa-router");
const proposalController = require("./proposal.controller");
const requireSignature = require("../../middleware/require-signature");

const router = new Router();

router.post("/proposals", requireSignature, proposalController.createProposal);
router.post("/comments", requireSignature, proposalController.postComment);
router.post("/votes", requireSignature, proposalController.vote);

router.get("/proposals", proposalController.getProposals);
router.get("/proposals/:proposalId", proposalController.getProposalById);
router.get("/proposals/:proposalId/comments", proposalController.getComments);
router.get("/proposals/:proposalId/votes", proposalController.getVotes);

module.exports = router;

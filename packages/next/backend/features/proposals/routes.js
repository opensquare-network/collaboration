const Router = require("koa-router");
const proposalController = require("./proposal.controller");
const requireSignature = require("../../middleware/require-signature");

const router = new Router();

router.post("/proposals", requireSignature, proposalController.createProposal);
router.post("/comments", requireSignature, proposalController.postComment);
router.post("/votes", requireSignature, proposalController.vote);

router.get("/proposals", proposalController.getProposals);
router.get("/proposals/pending", proposalController.getPendingProposals);
router.get("/proposals/active", proposalController.getActiveProposals);
router.get("/proposals/closed", proposalController.getClosedProposals);
router.get("/proposal/:proposalId", proposalController.getProposalById);
router.get("/proposals/:proposalId/comments", proposalController.getComments);
router.get("/proposals/:proposalCid/votes", proposalController.getVotes);
router.get("/proposals/:proposalId/votes/:address", proposalController.getAddressVote);
router.get("/proposals/:proposalCid/stats", proposalController.getStats);

module.exports = router;

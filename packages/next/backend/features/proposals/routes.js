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
router.get("/proposal/:proposalCid/comments", proposalController.getComments);
router.get("/proposal/:proposalCid/votes", proposalController.getVotes);
router.get("/proposal/:proposalId/votes/:address", proposalController.getAddressVote);
router.get("/proposal/:proposalCid/stats", proposalController.getStats);

module.exports = router;

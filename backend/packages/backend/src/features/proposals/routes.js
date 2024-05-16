const Router = require("koa-router");
const proposalController = require("./proposal.controller");
const requireSignature = require("../../middleware/require-signature");
const { getAverageTurnout } = require("./getAverageTurnout");
const { saveProposalSettings } = require("./saveProposalSettings");
const { getProposalSettings } = require("./getProposalSettings");

const router = new Router();

router.post("/proposals", requireSignature, proposalController.createProposal);
router.post("/comments", requireSignature, proposalController.postComment);
router.post("/votes", requireSignature, proposalController.vote);
router.post("/terminate", requireSignature, proposalController.terminate);

router.post("/proposals/settings", requireSignature, saveProposalSettings);
router.get("/proposals/settings", getProposalSettings);

router.get("/proposals", proposalController.getProposals);
router.get("/proposals/pending", proposalController.getPendingProposals);
router.get("/proposals/active", proposalController.getActiveProposals);
router.get("/proposals/closed", proposalController.getClosedProposals);
router.get("/proposal/:proposalId", proposalController.getProposalById);
router.get("/proposal/:proposalCid/comments", proposalController.getComments);
router.get("/proposal/:proposalCid/votes", proposalController.getVotes);
router.get(
  "/proposal/:proposalCid/votes/:address",
  proposalController.getAddressVote,
);
router.get(
  "/proposal/:proposalCid/votes/network/:network/address/:address",
  proposalController.getVoteByNetworkAddress,
);
router.get("/proposal/:proposalCid/stats", proposalController.getStats);
router.get(
  "/proposal/:proposalCid/voterbalance/:network/:address",
  proposalController.getVoterBalance,
);
router.get("/proposals/average-turnout", getAverageTurnout);

module.exports = router;

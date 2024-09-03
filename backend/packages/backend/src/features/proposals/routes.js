const Router = require("koa-router");
const requireSignature = require("../../middleware/require-signature");
const { getAverageTurnout } = require("./getAverageTurnout");
const { saveProposalSettings } = require("./saveProposalSettings");
const { getProposalSettings } = require("./getProposalSettings");
const { createProposal } = require("./createProposal");
const {
  getProposals,
  getPendingProposals,
  getActiveProposals,
  getClosedProposals,
} = require("./getProposals");
const { postComment } = require("./postComment");
const { vote } = require("./vote");
const { terminate } = require("./terminate");
const { getProposalById } = require("./getProposalById");
const { getComments } = require("./getComments");
const { getVotes } = require("./getVotes");
const { getAddressVote } = require("./getAddressVote");
const { getVoteByNetworkAddress } = require("./getVoteByNetworkAddress");
const { getStats } = require("./getStats");
const { getVoterBalance } = require("./getVoterBalance");

const router = new Router();

router.post("/proposals", requireSignature, createProposal);
router.post("/comments", requireSignature, postComment);
router.post("/votes", requireSignature, vote);
router.post("/terminate", requireSignature, terminate);

router.post("/proposals/settings", requireSignature, saveProposalSettings);
router.get("/proposals/settings", getProposalSettings);

router.get("/proposals", getProposals);
router.get("/proposals/pending", getPendingProposals);
router.get("/proposals/active", getActiveProposals);
router.get("/proposals/closed", getClosedProposals);
router.get("/proposal/:proposalId", getProposalById);
router.get("/proposal/:proposalCid/comments", getComments);
router.get("/proposal/:proposalCid/votes", getVotes);
router.get("/proposal/:proposalCid/votes/:address", getAddressVote);
router.get(
  "/proposal/:proposalCid/votes/network/:network/address/:address",
  getVoteByNetworkAddress,
);
router.get("/proposal/:proposalCid/stats", getStats);
router.get(
  "/proposal/:proposalCid/voterbalance/:network/:address",
  getVoterBalance,
);
router.get("/proposals/average-turnout", getAverageTurnout);

module.exports = router;

const { createProposal } = require("./createProposal");
const { createSocietyProposal } = require("./createSocietyProposal");
const { getProposalBySpace } = require("./getProposalBySpace");
const { getProposalById } = require("./getProposalById");
const { postComment } = require("./postComment");
const { getComments } = require("./getComments");
const { vote } = require("./vote");
const { voteSocietyProposal } = require("./voteSocietyProposal");
const { getVotes } = require("./getVotes");
const { getAddressVote } = require("./getAddressVote");
const { getStats } = require("./getStats");
const { getVoterBalance } = require("./getVoterBalance");
const { terminate } = require("./terminate");

module.exports = {
  createProposal,
  createSocietyProposal,
  getProposalBySpace,
  getProposalById,
  postComment,
  getComments,
  vote,
  voteSocietyProposal,
  getVotes,
  getAddressVote,
  getStats,
  getVoterBalance,
  terminate,
};

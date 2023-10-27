const { chainsDef } = require("./chainsDef");

const ContentType = Object.freeze({
  Markdown: "markdown",
  Html: "html",
});

const ChoiceType = Object.freeze({
  Single: "single",
  Multiple: "multiple",
});

const PostTitleLengthLimitation = 160;

const WeightStrategy = Object.freeze({
  BalanceOf: "balance-of",
  QuorumBalanceOf: "quorum-balance-of",
  QuadraticBalanceOf: "quadratic-balance-of",
  QuorumQuadraticBalanceOf: "quorum-quadratic-balance-of",
});

const NotificationType = Object.freeze({
  NewProposal: "newProposal",
  ProposalStarted: "proposalStarted",
  ProposalCloseToEnd: "proposalCloseToEnd",
  ProposalEnd: "proposalEnd",
});

module.exports = {
  ContentType,
  ChoiceType,
  PostTitleLengthLimitation,
  WeightStrategy,
  NotificationType,
  chainsDef,
};

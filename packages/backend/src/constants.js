const ContentType = Object.freeze({
  Markdown: "markdown",
  Html: "html",
});

const ChoiceType = Object.freeze({
  Single: "single",
});

const PostTitleLengthLimitation = 160;

const WeightStrategy = Object.freeze({
  BalanceOf: "balance-of",
  QuadraticBalanceOf: "quadratic-balance-of",
});

module.exports = {
  ContentType,
  ChoiceType,
  PostTitleLengthLimitation,
  WeightStrategy,
};

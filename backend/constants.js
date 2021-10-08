const SS58Format = Object.freeze({
  Polkadot: 0,
  Kusama: 2,
  Karura: 8,
  Khala: 30,
  Substrate: 42,
});

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
  SqrtOfBalanceOf: "sqrt-of-balance-of",
});

module.exports = {
  SS58Format,
  ContentType,
  ChoiceType,
  PostTitleLengthLimitation,
  WeightStrategy,
};

const SS58Format = Object.freeze({
  Polkadot: 0,
  Kusama: 2,
  Karura: 8,
  Khala: 30,
  Substrate: 42,
});

const Networks = Object.freeze({
  Polkadot: {
    symbol: "DOT",
    network: "polkadot",
    ss58Format: SS58Format.Polkadot,
    decimals: 10,
  },
  Kusama: {
    symbol: "KSM",
    network: "kusama",
    ss58Format: SS58Format.Kusama,
    decimals: 12,
  },
  Karura: {
    symbol: "KAR",
    network: "karura",
    ss58Format: SS58Format.Karura,
    decimals: 12,
  },
  Khala: {
    symbol: "PHA",
    network: "khala",
    relay: "kusama",
    ss58Format: SS58Format.Khala,
    decimals: 12,
  }
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
  QuadraticBalanceOf: "quadratic-balance-of",
});

module.exports = {
  SS58Format,
  Networks,
  ContentType,
  ChoiceType,
  PostTitleLengthLimitation,
  WeightStrategy,
};

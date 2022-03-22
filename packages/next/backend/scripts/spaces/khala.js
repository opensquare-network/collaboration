const khalaConfig = {
  id: "khala",
  name: "Khala",
  symbol: "PHA",
  decimals: 12,
  networks: [
    {
      network: "khala",
      ss58Format: 30,
    },
  ],
  proposeThreshold: "10000000000000",
  voteThreshold: "10000000000",
  weightStrategy: ["balance-of", "quadratic-balance-of"],
  version: "2",
};

module.exports = {
  khalaConfig,
};

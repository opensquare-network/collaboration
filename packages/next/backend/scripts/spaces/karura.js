const config = {
  id: "karura",
  name: "Karura",
  symbol: "KAR",
  decimals: 12,
  networks: [
    {
      network: "karura",
      ss58Format: 8,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: ["balance-of", "quadratic-balance-of"],
  version: "2",
};

module.exports = {
  karuraConfig: config,
};

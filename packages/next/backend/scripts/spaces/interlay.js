const config = {
  id: "interlay",
  name: "Interlay",
  symbol: "INTR",
  decimals: 10,
  networks: [
    {
      network: "interlay",
      ss58Format: 2032,
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "10000000000",
  weightStrategy: ["balance-of", "quadratic-balance-of"],
  version: "2",
};

module.exports = {
  interlayConfig: config,
};

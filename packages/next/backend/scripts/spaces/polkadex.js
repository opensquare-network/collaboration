const config = {
  id: "polkadex",
  name: "Polkadex",
  symbol: "PDEX",
  decimals: 12,
  networks: [
    {
      network: "polkadex",
      ss58Format: 88,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: ["balance-of", "quadratic-balance-of"],
  version: "2",
};

module.exports = {
  polkadexConfig: config,
};

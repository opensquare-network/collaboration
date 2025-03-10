const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "permanence",
  name: "Permanence",
  symbol: "DOT",
  decimals: 10,
  accessibility: Accessibility.WHITELIST,
  whitelist: [
    // list addresses here to give them access to the space
    "1ZSPR3zNg5Po3obkhXTPR95DepNBzBZ3CyomHXGHK9Uvx6w", // William
    "1xzcLSwo7xBFkJYZiL4EHaqFpuPTkH641E3V43W4cuk1bX6", // PolkaBiz
    "12His7t3EJ38tjdBbivUzWQeaNCLKfMqtKp1Ed3xHMyCE9N3", // The Ionian Group
    "12s6UMSSfE2bNxtYrJc6eeuZ7UxQnRpUzaAh1gPQrGNFnE8h", // Polkadotters
    "13EDmaUe89xXocPppFmuoAZaCsckaJy3deAyVyiykk1zKQbF", // PMEI
    // "14333MZvbGkcq5CZ8fYHZiFYwHNDaW3uiErDKMb7oqnupWXn", // Transistor
    "14gMJV95zwxUsFEZDSC8mtBVifS6SypKJkfBKANkMsLZdeVb", // Yongfeng Li
    "14Gn7SEmCgMX7Ukuppnw5TRjA7pao2HFpuJo39frB42tYLEh", // EzioRed
    "15fTH34bbKGMUjF1bLmTqxPYgpg481imThwhWcQfCyktyBzL", // Helikon
    "167YoKNriVtP4Nxk9F9GRV7HTKu5VnxaRq1pKMANAnmmTY9F", // José Rabasso
    "13znFMMjHyM2UvSewvaKMC2bLUcySRMzcM8BAMTzm1G2P5ju", // PERMANENCE DAO/GOV-PROXY
    "12KtA8mtfsK1CyQb4utLiwG3ao22z77w2cM2GqnaL2RiDCoJ", // Flez
  ],
  networks: [
    {
      network: networks.polkadot,
      ss58Format: 0,
      assets: [
        {
          symbol: "DOT",
          decimals: 10,
        },
      ],
    },
  ],
  weightStrategy: [strategies.onePersonOneVote],
  version: "4",
  spaceIcon: "permanence.svg",
  seoCoverFilename: "permanence_dao.jpg",
  admins: [],
};

module.exports = {
  permanenceConfig: config,
};

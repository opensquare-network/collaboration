const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const stellaSwapConfig = {
  id: "stellaswap",
  name: "StellaSwap",
  symbol: "xStella",
  decimals: 18,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.moonbeam,
      assets: [
        {
          type: "erc20",
          contract: "0x06A3b410b681c82417A906993aCeFb91bAB6A080",
          symbol: "xStella",
          decimals: 18,
          votingThreshold: "0",
        },
        {
          type: "stellaswap_staking",
          symbol: "xStella",
          assetName: "xStella (Pool)",
          decimals: 18,
          votingThreshold: "0",
        },
      ],
    },
  ],
  proposeThreshold: "15000000000000000000000",
  weightStrategy: [strategies.balanceOf],
  maxOptionsCount: 30,
  version: "4",
  spaceIcon: "stellaswap.svg",
  seoCoverFilename: "stellaswap.jpg",
  proposalTemplate: {
    title: "Incentives vote for pool <token1>-<token2>",
    body: `## Instructions
- provide the pulsar (only pulsar pools are eligible) pool contract address and an explanation to the community of why they should support allocating tokens to your pool. Delete these instructions before Submitting your request.
- Set the Period from Now to 1 week in the future. This is the amount of time the proposal will be open
- Set the Snapshot to Now. This is the point in time where everyone's xStella holdings will be calculated
- Set the Choices to Yes and No. Leave System on Single Choice Voting.
If these instructions are not followed, Stellaswap will not recognize the result of this vote

## Pool Address
<pool address>

## Pitch
<Explain why this is a good pool to incentivize>`,
  },
  admins: ["0x3466ACC8D2d7064367B837cF6eEFac9659d3Ad2A"],
  onlyAdminCanCreateProposals: true,
};

module.exports = {
  stellaSwapConfig,
};

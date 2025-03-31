const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "jamdao",
  name: "JAM DAO",
  symbol: "DOT",
  decimals: 10,
  accessibility: Accessibility.WHITELIST,
  whitelist: [
    // list addresses here to give them access to the space
    "121Rs6fKm8nguHnvPfG1Cq3ctFuNAVZGRmghwkJwHpKxKjbx", // JAM DUNA
    "143FppLAgb1KrvTRfkWKnozBeoZsZrhRr41gSBMyUDkUNT8z", // Gossamer
    "15mXN5E3gn14t3etvcGHGfR4zL9WNoCBGCu9rJJiERqjePY8", // Jamixir
    "14zb7FpKGRCoW8SPezDHsMzqhGAuEn6Wjprf4j2Gn85dGVEh", // JavaJAM
    "14T1UcnoaMND24ubV86FCT4YxJ8q5CKVG7winwZ7umAit8g2", // JamZig ⚡️
    "12iqwZGB2sguEhjFi2ZRuWWixU8mHJnSiP1pwDefqGsBy4rV", // JamPy
    "1urZ9pp1D6aL6SRwepP9zhU2kzgxJ3dtRodSLe4paJCpLrk", // Vinwolf
    "155tk9HmeJGsNZtA5LFasSCGZCdpAb2P2Gs6ej9JeP38sAww", // TSJam
    "14DsLzVyTUTDMm2eP3czwPbH53KgqnQRp3CJJZS9GR7yxGDP", // Boka
    "134Dbw4pZY1E81fb79XtjRvzW55qEx3FpEgrRYfJfDf3weF6", // New JAMneration
    "15gPiSBxhrrQFfShFbrnsQK7kokgQtVs3SEh38YjCDC31de3", // JAMdotTech | PyJAMaz
    "123KEnwuHKiu48WsfwAX4YonGFTpkEmWS6V2WGoJA1qzBkbS", // MORUM
    "15p3jWZaP4dHTkDTuKM5VXQL5XGfH9U5r6Ntu3UAv2K7vPb8", // Tessera
    "15R1pWegyu7AfMev8DBMT67qxYoJhA1v7BbA2nn7S2uJ5QDF", // JamBrains
    "15fGrDWmFoaApnZXEw1Zg45zuCqpkbMS9YPzczeU9dHseUUu", // Fluffy Labs
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
  spaceIcon: "jamdao.svg",
  seoCoverFilename: "jam_dao.jpg",
  admins: [],
};

module.exports = {
  jamDaoConfig: config,
};

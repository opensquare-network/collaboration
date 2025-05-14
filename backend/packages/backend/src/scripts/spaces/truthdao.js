const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "truthdao",
  name: "Truth DAO",
  symbol: "DOT",
  decimals: 10,
  accessibility: Accessibility.WHITELIST,
  whitelist: [
    // list addresses here to give them access to the space
    "12mP4sjCfKbDyMRAEyLpkeHeoYtS5USY4x34n9NMwQrcEyoh", // polkaworld
    "167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h", // Qinwen(Lollipop)
    "16ap6fdqS2rqFsyYah35hX1FH6rPNWtLqqXZDQC9x6GW141C", // Lurpis
    "14pa3BAYZLPvZfRDjWEfZXZWBVU45E67HUQEUxNCrdXGoata", // Tiny/Mimir
    "14qwyVVvW4Tuhq4Fvt2AHZqhbCtGfVb8HUY2xM2PKrzKsmZT",
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
  spaceIcon: "truthdao.svg",
  seoCoverFilename: "truthdao.jpg",
  admins: [],
};

module.exports = {
  truthDaoConfig: config,
};

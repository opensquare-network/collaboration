const { AssetTypes } = require("./assetTypes");

const chainsDef = {
  polkadot: {
    name: "Polkadot",
    network: "polkadot",
    ss58Format: 0,
    symbol: "DOT",
    decimals: 10,
  },
  kusama: {
    name: "Kusama",
    network: "kusama",
    ss58Format: 2,
    symbol: "KSM",
    decimals: 12,
  },
  statemine: {
    name: "Statemine",
    network: "statemine",
    ss58Format: 2,
    supportAssetTypes: [AssetTypes.ASSETS],
    symbol: "KSM",
    decimals: 12,
  },
  statemint: {
    name: "Statemint",
    network: "statemint",
    ss58Format: 0,
    supportAssetTypes: [AssetTypes.ASSETS],
    symbol: "DOT",
    decimals: 10,
  },
  karura: {
    name: "Karura",
    network: "karura",
    ss58Format: 8,
    supportAssetTypes: [AssetTypes.ORML],
    symbol: "KAR",
    decimals: 12,
  },
  bifrost: {
    name: "Bifrost",
    network: "bifrost",
    ss58Format: 0,
    supportAssetTypes: [AssetTypes.ORML],
    symbol: "BNC",
    decimals: 12,
  },
  ethereum: {
    name: "Ethereum",
    network: "ethereum",
    supportAssetTypes: [AssetTypes.EVM_ERC20],
    symbol: "ETH",
    decimals: 18,
  },
  acala: {
    name: "Acala",
    network: "acala",
    ss58Format: 10,
    symbol: "ACA",
    decimals: 12,
  },
  darwinia: {
    name: "Darwinia",
    network: "darwinia",
    ss58Format: 18,
    symbol: "RING",
    decimals: 9,
  },
  shiden: {
    name: "Shiden",
    network: "shiden",
    ss58Format: 5,
    symbol: "SDN",
    decimals: 18,
  },
  hydradx: {
    name: "Hydradx",
    network: "hydradx",
    ss58Format: 0,
    symbol: "HDX",
    decimals: 12,
  },
};

module.exports = {
  chainsDef,
};

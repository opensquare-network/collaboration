const dotenv = require("dotenv");
dotenv.config();

const { getChainCollection } = require("../mongo");

const AssetTypes = {
  ORML: "orml",
  EVM_ERC20: "evm_erc20",
  ASSETS: "assets",
};

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
    ss58Format: 6,
    supportAssetTypes: [AssetTypes.ORML],
    symbol: "BNC",
    decimals: 12,
  },
  moonriver: {
    name: "Moonriver",
    network: "moonriver",
    ss58Format: 1285,
    supportAssetTypes: [AssetTypes.EVM_ERC20],
    symbol: "MOVR",
    decimals: 18,
  },
  moonbeam: {
    name: "Moonbeam",
    network: "moonbeam",
    ss58Format: 1284,
    supportAssetTypes: [AssetTypes.EVM_ERC20],
    symbol: "GLMR",
    decimals: 18,
  },
  phala: {
    name: "Phala",
    network: "phala",
    ss58Format: 30,
    symbol: "PHA",
    decimals: 12,
  },
  khala: {
    name: "Khala",
    network: "khala",
    ss58Format: 30,
    symbol: "PHA",
    decimals: 12,
  },
  ethereum: {
    name: "Ethereum",
    network: "ethereum",
    supportAssetTypes: [AssetTypes.EVM_ERC20],
    symbol: "ETH",
    decimals: 18,
  },
  kintsugi: {
    name: "Kintsugi",
    network: "kintsugi",
    ss58Format: 2092,
    symbol: "KINT",
    decimals: 12,
  },
  interlay: {
    name: "Interlay",
    network: "interlay",
    ss58Format: 2032,
    symbol: "INTR",
    decimals: 10,
  },
  acala: {
    name: "Acala",
    network: "acala",
    ss58Format: 10,
    symbol: "ACA",
    decimals: 12,
  },
  crust: {
    name: "Crust",
    network: "crust",
    ss58Format: 66,
    symbol: "CRU",
    decimals: 18,
  },
  darwinia: {
    name: "Darwinia",
    network: "darwinia",
    ss58Format: 18,
    symbol: "RING",
    decimals: 9,
  },
  turing: {
    name: "Turing",
    network: "turing",
    ss58Format: 51,
    symbol: "TUR",
    decimals: 10,
  },
  litmus: {
    name: "Litmus",
    network: "litmus",
    ss58Format: 131,
    symbol: "LIT",
    decimals: 12,
  },
  zeitgeist: {
    name: "Zeitgeist",
    network: "zeitgeist",
    ss58Format: 73,
    symbol: "ZTG",
    decimals: 10,
  },
  shiden: {
    name: "Shiden",
    network: "shiden",
    ss58Format: 5,
    symbol: "SDN",
    decimals: 18,
  },
  centrifuge: {
    name: "Centrifuge",
    network: "centrifuge",
    ss58Format: 36,
    symbol: "CFG",
    decimals: 18,
  },
  altair: {
    name: "Altair",
    network: "altair",
    ss58Format: 136,
    symbol: "AIR",
    decimals: 18,
  },
  parallel: {
    name: "Parallel",
    network: "parallel",
    ss58Format: 172,
    symbol: "PARA",
    decimals: 12,
  },
  basilisk: {
    name: "Basilisk",
    network: "basilisk",
    ss58Format: 10041,
    symbol: "BSX",
    decimals: 12,
  },
  hydradx: {
    name: "Hydradx",
    network: "hydradx",
    ss58Format: 63,
    symbol: "HDX",
    decimals: 12,
  },
  rococo: {
    name: "Rococo",
    network: "rococo",
    ss58Format: 42,
    symbol: "ROC",
    decimals: 12,
  },
};

async function main() {
  const chainCOl = await getChainCollection();
  const bulk = chainCOl.initializeUnorderedBulkOp();
  for (const chain in chainsDef) {
    const chainDef = chainsDef[chain];
    bulk
      .find({ network: chainDef.network })
      .upsert()
      .update({ $set: chainDef });
  }
  await bulk.execute();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
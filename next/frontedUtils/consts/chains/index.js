import litmus from "./litmus";
import parallel from "./parallel";
import phala from "./phala";
import polkadex from "./polkadex";
import shiden from "./shiden";
import statemine from "./statemine";
import statemint from "./statemint";
import turing from "./turing";
import zeitgeist from "./zeitgeist";
import polkadot from "./polkadot";
import kusama from "./kusama";
import acala from "./acala";
import altair from "./altair";
import bifrostKusama from "./bifrostKusama";
import bifrostPolkadot from "./bifrostPolkadot";
import centrifuge from "./centrifuge";
import crust from "./crust";
import interlay from "./interlay";
import karura from "./karura";
import khala from "./khala";
import kintsugi from "./kintsugi";
import basilisk from "./basilisk";
import hydradx from "./hydradx";
import rococo from "./rococo";
import stafi from "./stafi";
import creditcoin from "./creditcoin";

export const chainConfigsMap = {
  polkadot,
  kusama,
  acala,
  altair,
  bifrost: bifrostKusama,
  "bifrost-polkadot": bifrostPolkadot,
  centrifuge,
  crust,
  interlay,
  karura,
  khala,
  kintsugi,
  litmus,
  parallel,
  phala,
  polkadex,
  shiden,
  stafi,
  statemine,
  statemint,
  turing,
  zeitgeist,
  basilisk,
  hydradx,
  rococo,
  creditcoin,
  creditcoin_native: creditcoin,
};

export function getChainConfigs(chain) {
  const configs = chainConfigsMap[chain];
  if (!configs) {
    throw new Error(`No chain configs for ${chain}`);
  }

  return configs;
}

export const evm = {
  moonbeam: "moonbeam",
  moonriver: "moonriver",
  ethereum: "ethereum",
  creditcoin_evm: "creditcoin_evm",
};
export const evmChains = [
  evm.moonbeam,
  evm.moonriver,
  evm.ethereum,
  evm.creditcoin_evm,
];
export const evmChainId = Object.freeze({
  [evm.moonbeam]: 1284,
  [evm.moonriver]: 1285,
  [evm.ethereum]: 1,
  [evm.creditcoin_evm]: 102030,
});

import litmus from "./litmus";
import parallel from "./parallel";
import phala from "./phala";
import polkadex from "./polkadex";
import shiden from "./shiden";
import statemine from "./statemine";
import statemint from "./statemint";
import turing from "./turing";
import polkadot from "./polkadot";
import kusama from "./kusama";
import acala from "./acala";
import altair from "./altair";
import astar from "./astar";
import bifrostKusama from "./bifrostKusama";
import bifrostPolkadot from "./bifrostPolkadot";
import karura from "./karura";
import khala from "./khala";
import hydradx from "./hydradx";
import hydration from "./hydration";
import rococo from "./rococo";
import creditcoin from "./creditcoin";

export const chainConfigsMap = {
  polkadot,
  kusama,
  acala,
  altair,
  astar,
  bifrost: bifrostKusama,
  "bifrost-polkadot": bifrostPolkadot,
  karura,
  khala,
  litmus,
  parallel,
  phala,
  polkadex,
  shiden,
  statemine,
  statemint,
  turing,
  hydradx,
  hydration,
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
  astar_evm: "astar_evm",
};
export const evmChains = [
  evm.moonbeam,
  evm.moonriver,
  evm.ethereum,
  evm.creditcoin_evm,
  evm.astar_evm,
];
export const evmChainId = Object.freeze({
  [evm.moonbeam]: 1284,
  [evm.moonriver]: 1285,
  [evm.ethereum]: 1,
  [evm.creditcoin_evm]: 102030,
  [evm.astar_evm]: 592,
});

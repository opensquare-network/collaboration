import litmus from "./litmus";
import parallel from "./parallel";
import phala from "./phala";
import polkadex from "./polkadex";
import shiden from "./shiden";
import statemine from "./statemine";
import turing from "./turing";
import zeitgeist from "./zeitgeist";
import polkadot from "./polkadot";
import kusama from "./kusama";
import acala from "./acala";
import altair from "./altair";
import bifrost from "./bifrost";
import centrifuge from "./centrifuge";
import crust from "./crust";
import darwinia from "./darwinia";
import interlay from "./interlay";
import karura from "./karura";
import khala from "./khala";
import kintsugi from "./kintsugi";
import basilisk from "./basilisk";
import hydradx from "./hydradx";

export const chainConfigsMap = {
  polkadot,
  kusama,
  acala,
  altair,
  bifrost,
  centrifuge,
  crust,
  darwinia,
  interlay,
  karura,
  khala,
  kintsugi,
  litmus,
  parallel,
  phala,
  polkadex,
  shiden,
  statemine,
  turing,
  zeitgeist,
  basilisk,
  hydradx,
};

export function getChainConfigs(chain) {
  const configs = chainConfigsMap[chain];
  if (!configs) {
    throw new Error(`No chain cofigs for ${chain}`);
  }

  return configs;
}

export const evm = {
  moonriver: "moonriver",
  ethereum: "ethereum",
};
export const evmChains = [evm.moonriver, evm.ethereum];
export const evmChainId = Object.freeze({
  [evm.moonriver]: 1285,
  [evm.ethereum]: 1,
});

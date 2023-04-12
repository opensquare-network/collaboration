import kusama from "./kusama";
import polkadot from "./polkadot";
import rmrkCuration from "./rmrk-curation";
import rmrk from "./rmrk";
import phala from "./phala";
import khala from "./khala";
import karura from "./karura";
import kintsugi from "./kintsugi";
import bifrost from "./bifrost";
import polarisdao from "./polarisdao";
import polkadex from "./polkadex";
import chrwna from "./chrwna";
import interlay from "./interlay";
import acala from "./acala";
import crust from "./crust";
import turing from "./turing";
import darwinia from "./darwinia";
import centrifuge from "./centrifuge";
import litentry from "./litentry";
import zeitgeist from "./zeitgeits";
import shiden from "./shiden";
import altair from "./altair";
import parallel from "./parallel";
import dotsama from "./dotsama";
import lksm from "./lksm";
import basilisk from "./basilisk";
import hydradx from "./hydradx";
import rococo from "./rococo";
import { defaultSeoImage } from "./sns";

const configsMap = {
  polkadot,
  kusama,
  karura,
  khala,
  phala,
  rmrk,
  ["rmrk-curation"]: rmrkCuration,
  bifrost,
  kintsugi,
  polarisdao,
  polkadex,
  chrwna,
  interlay,
  acala,
  crust,
  turing,
  darwinia,
  centrifuge,
  litentry,
  zeitgeist,
  shiden,
  altair,
  parallel,
  dotsama,
  lksm,
  basilisk,
  hydradx,
  rococo,
};

export default function getSpaceConfigs(spaceId) {
  const configs = configsMap[spaceId];
  if (!configs) {
    throw `can not get space configs of ${spaceId}`;
  }

  return configs;
}

export function getSpaceSeoImage(spaceId) {
  const config = configsMap[spaceId];
  return config ? config.seoImage : defaultSeoImage;
}

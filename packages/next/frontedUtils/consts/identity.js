import { CHAINS } from "./chains";

export const identityChainMap = Object.freeze({
  [CHAINS.kintsugi]: [CHAINS.kusama],
  [CHAINS.statemine]: [CHAINS.kusama],
  [CHAINS.karura]: [CHAINS.kusama],
  [CHAINS.khala]: [CHAINS.khala],
  [CHAINS.phala]: [CHAINS.phala],
  [CHAINS.interlay]: [CHAINS.polkadot],
  [CHAINS.acala]: [CHAINS.polkadot],
  [CHAINS.crust]: [CHAINS.crust],
  [CHAINS.turing]: [CHAINS.turing],
  [CHAINS.crab]: [CHAINS.crab],
  [CHAINS.darwinia]: [CHAINS.darwinia],
  [CHAINS.litmus]: [CHAINS.kusama],
});

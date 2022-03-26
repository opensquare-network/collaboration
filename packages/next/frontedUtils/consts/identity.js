import { CHAINS } from "./chains";

export const identityChainMap = Object.freeze({
  [CHAINS.kintsugi]: [CHAINS.kusama],
  [CHAINS.statemine]: [CHAINS.kusama],
  [CHAINS.karura]: [CHAINS.kusama],
  [CHAINS.interlay]: [CHAINS.polkadot],
});

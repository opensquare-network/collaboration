import { ChainIcon as _ChainIcon } from "@osn/common-ui";

export function ChainIcon({ chainName, size }) {
  let _chainName = chainName;
  if (chainName === "creditcoin_evm") {
    _chainName = "creditcoin";
  }
  return <_ChainIcon chainName={_chainName} size={size} />;
}

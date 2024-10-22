import { isSameAddress } from "frontedUtils/address";
import useMaybeProxyAddress from "./useMaybeProxyAddress";

export function useIsWhitelistMember(whitelist) {
  const address = useMaybeProxyAddress();
  return (whitelist || []).some((item) => isSameAddress(item, address));
}

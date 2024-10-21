import { isSameAddress } from "frontedUtils/address";
import { useSelector } from "react-redux";
import { loginAddressSelector } from "store/reducers/accountSlice";

export function useIsWhitelistMember(whitelist) {
  const loginAddress = useSelector(loginAddressSelector);
  return (whitelist || []).some((address) =>
    isSameAddress(address, loginAddress),
  );
}

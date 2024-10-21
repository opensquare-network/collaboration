import { loginAddressSelector } from "store/reducers/accountSlice";
import { Hint } from "./styled";
import { useIsWhitelistMember } from "hooks/useIsWhitelistMember";
import { useSelector } from "react-redux";

export default function WhitelistMemberHint({ whitelist, children }) {
  const loginAddress = useSelector(loginAddressSelector);
  const isMember = useIsWhitelistMember(whitelist);
  if (!loginAddress || isMember) {
    return null;
  }

  return <Hint>{children}</Hint>;
}

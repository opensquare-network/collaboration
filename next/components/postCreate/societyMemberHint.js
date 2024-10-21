import { useIsSocietyMember } from "hooks/useIsSocietyMember";
import { Hint } from "./styled";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { useSelector } from "react-redux";

export default function SocietyMemberHint() {
  const loginAddress = useSelector(loginAddressSelector);
  const isSocietyMember = useIsSocietyMember();

  if (!loginAddress || isSocietyMember) {
    return null;
  }

  return <Hint>You are not a society member</Hint>;
}

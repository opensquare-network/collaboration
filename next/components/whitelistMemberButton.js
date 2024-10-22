import { Button } from "@osn/common-ui";
import { useIsWhitelistMember } from "hooks/useIsWhitelistMember";

export default function WhitelistMemberButton({
  whitelist,
  children,
  disabled,
  ...props
}) {
  const isWhitelistMember = useIsWhitelistMember(whitelist);
  return (
    <Button disabled={disabled || !isWhitelistMember} {...props}>
      {children}
    </Button>
  );
}

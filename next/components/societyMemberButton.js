import { Button } from "@osn/common-ui";
import { useIsSocietyMember } from "hooks/useIsSocietyMember";

export default function SocietyMemberButton({ children, disabled, ...props }) {
  const isSocietyMember = useIsSocietyMember();
  return (
    <Button disabled={disabled || !isSocietyMember} {...props}>
      {children}
    </Button>
  );
}

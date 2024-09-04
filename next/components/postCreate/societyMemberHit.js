import { useIsSocietyMember } from "hooks/useIsSocietyMember";
import styled from "styled-components";

const Hint = styled.div`
  margin-top: 4px !important;
  color: var(--textFeedbackError);
`;

export default function SocietyMemberHit() {
  const isSocietyMember = useIsSocietyMember();
  if (isSocietyMember) {
    return null;
  }

  return <Hint>You are not a society member</Hint>;
}

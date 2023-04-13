import { IdentityUser } from "@osn/common-ui";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: #506176;
`;

export default function DelegationInfo({ delegatee, network }) {
  return (
    <Wrapper>
      <span>Delegated to</span>
      <IdentityUser
        address={delegatee}
        network={network}
        networkIconSize={16}
      />
      <span>You cannot vote directly.</span>
    </Wrapper>
  );
}

import styled from "styled-components";
import { SectionTitle } from "../styled";
import { Input } from "@osn/common-ui";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function ProposalThreshold({
  symbol,
  proposalThreshold,
  setProposalThreshold,
}) {
  return (
    <Wrapper>
      <SectionTitle>Proposal Threshold</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of space..."
          value={proposalThreshold}
          onChange={(e) => setProposalThreshold(e.target.value)}
          suffix={symbol}
        />
      </InputWrapper>
    </Wrapper>
  );
}

import styled from "styled-components";
import { SectionTitle } from "../styled";
import { Flex, Input } from "@osn/common-ui";
import Tooltip from "@/components/tooltip";

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
      <Flex style={{ gap: "4px", alignItems: "flex-start" }}>
        <SectionTitle>Proposal Threshold</SectionTitle>
        <Tooltip content="Only account with balance >= threshold can propose" />
      </Flex>
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

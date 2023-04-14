import styled from "styled-components";
import { Input } from "@osn/common-ui";
import { FieldWrapper, Title } from "./styled";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;

  > * {
    flex-grow: 1;
  }
`;

export default function AssetConfig({
  symbol,
  threshold,
  setThreshold,
  votingWeight,
  setVotingWeight,
}) {
  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Threshold</Title>
        <Input
          placeholder="0"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          suffix={<span style={{ whiteSpace: "nowrap" }}>{symbol}</span>}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Title>Voting Weight</Title>
        <Input
          placeholder="1"
          value={votingWeight}
          onChange={(e) => setVotingWeight(e.target.value)}
          suffix="VOTE"
        />
      </FieldWrapper>
    </Wrapper>
  );
}

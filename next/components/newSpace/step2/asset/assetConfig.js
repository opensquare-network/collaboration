import styled, { css } from "styled-components";
import { Input } from "@osn/common-ui";
import { FieldWrapper, Title } from "./styled";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;

  > * {
    flex-grow: 1;
  }
`;

const MyFieldWrapper = styled(FieldWrapper)`
  > div {
    ${({ disabled }) =>
      disabled &&
      css`
        background: #f0f3f8;
      `}
  }
`;

export default function AssetConfig({
  count,
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
      <MyFieldWrapper disabled={count == 1}>
        <Title>Voting Weight</Title>
        <Input
          disabled={count === 1}
          placeholder="1"
          value={votingWeight}
          onChange={(e) => setVotingWeight(e.target.value)}
          suffix="VOTE"
        />
      </MyFieldWrapper>
    </Wrapper>
  );
}

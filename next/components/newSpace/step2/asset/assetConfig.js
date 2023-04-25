import styled, { css } from "styled-components";
import { Flex, Input } from "@osn/common-ui";
import { FieldWrapper, Title } from "./styled";
import Tooltip from "@/components/tooltip";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;

  > * {
    flex-grow: 1;
  }
`;

const MyFieldWrapper = styled(FieldWrapper)`
  > :nth-child(2) {
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
  votingThreshold,
  setVotingThreshold,
  votingWeight,
  setVotingWeight,
}) {
  return (
    <Wrapper>
      <FieldWrapper>
        <Flex style={{ gap: "4px" }}>
          <Title>Threshold</Title>
          <Tooltip
            iconSize={16}
            content="Only account with balance >= threshold can vote"
          />
        </Flex>
        <Input
          placeholder="0"
          value={votingThreshold}
          onChange={(e) => setVotingThreshold(e.target.value)}
          suffix={<span style={{ whiteSpace: "nowrap" }}>{symbol}</span>}
        />
      </FieldWrapper>
      <MyFieldWrapper disabled={count == 1}>
        <Flex style={{ gap: "4px" }}>
          <Title>Voting Weight</Title>
          <Tooltip
            iconSize={16}
            content={
              <span>
                Voting weight refers to the level of influence
                <br />
                Votes = Token * Voting Weight
              </span>
            }
          />
        </Flex>
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

import styled from "styled-components";
import { Input } from "@osn/common-ui";
import { FieldWrapper, Title } from "./styled";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;

  > * {
    flex-grow: 1;
    > div {
      background: #f0f3f8;
    }
  }
`;

export default function AssetDetail({ symbol, decimals }) {
  if (!symbol || !decimals) {
    return null;
  }

  return (
    <Wrapper>
      <FieldWrapper>
        <Title>Symbol</Title>
        <Input value={symbol} disabled />
      </FieldWrapper>
      <FieldWrapper>
        <Title>Decimals</Title>
        <Input value={decimals} disabled />
      </FieldWrapper>
    </Wrapper>
  );
}

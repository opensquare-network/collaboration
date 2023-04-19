import styled from "styled-components";
import { Input, noop } from "@osn/common-ui";
import { FieldWrapper, Title } from "./styled";
import { useEffect } from "react";

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

export default function AssetDetail({
  symbol,
  decimals,
  asset,
  setPartialAsset = noop,
}) {
  useEffect(() => {
    if (symbol === asset?.symbol && decimals === asset?.decimals) {
      return;
    }

    setPartialAsset({ symbol, decimals });
  }, [asset, symbol, decimals, setPartialAsset]);

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

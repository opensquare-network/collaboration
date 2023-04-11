import ChainSelector from "@/components/chainSelector";
import { noop } from "@osn/common-ui";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { availableNetworksSelector } from "store/reducers/accountSlice";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > :first-child {
    margin-bottom: 32px;
  }
`;

const Title = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #1e2134;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function Asset({ index, asset, setAsset = noop }) {
  const availableNetworks = useSelector(availableNetworksSelector);

  const onSelectChain = useCallback(
    (chain) => {
      if (chain.network === asset.chain) {
        // this is required to prevent infinite loop
        return;
      }
      setAsset(index, { ...asset, chain: chain.network });
    },
    [index, asset]
  );

  return (
    <Wrapper>
      <Title>Asset #{index + 1}</Title>
      <FieldWrapper>
        <Title>Chain</Title>
        <ChainSelector chains={availableNetworks} onSelect={onSelectChain} />
      </FieldWrapper>
    </Wrapper>
  );
}

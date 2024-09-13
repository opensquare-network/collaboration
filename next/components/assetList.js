import styled from "styled-components";
import { p_14_medium, p_12_normal } from "../styles/textStyles";
import { FlexBetween } from "@osn/common-ui";
import { ChainIcon } from "components/chainIcon";
import { Tooltip } from "@osn/common-ui";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailsValue = styled(FlexBetween)`
  ${p_14_medium};
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const AssetName = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const AssetIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const DelegationText = styled.span`
  ${p_12_normal}
  color: var(--textTertiary);
  text-transform: capitalize;
`;

const voteText = (n) => `${n} ${n === 1 ? "vote" : "votes"}`;

export default function AssetList({ assets }) {
  return (
    <Wrapper>
      {assets.map(
        ({ network, symbol, assetName, multiplier = 1, delegation }, index) => (
          <div key={index}>
            <DetailsValue>
              <AssetName>
                <AssetIconContainer>
                  <ChainIcon chainName={network} size={20} />
                </AssetIconContainer>
                <FlexColumn>
                  <span>{assetName || symbol}</span>
                  {delegation && <DelegationText>delegation</DelegationText>}
                </FlexColumn>
              </AssetName>
              <Tooltip
                content={`1 ${assetName || symbol} = ${voteText(multiplier)}`}
              >
                <div>
                  <FlexColumn style={{ alignItems: "flex-end" }}>
                    <span>{`x${multiplier}`}</span>
                    {delegation && (
                      <DelegationText>{delegation}</DelegationText>
                    )}
                  </FlexColumn>
                </div>
              </Tooltip>
            </DetailsValue>
          </div>
        ),
      )}
    </Wrapper>
  );
}

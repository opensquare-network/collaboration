import styled from "styled-components";
import {
  p_14_normal,
  p_14_medium,
  p_16_semibold,
  p_20_semibold,
} from "../../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";
import ChainIcon from "../chain/chainIcon";
import Divider from "../styled/divider";
import { capitalize, toPrecision } from "frontedUtils";

const Wrapper = styled.div``;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  // override 'SpaceLogo' margin-right
  > :first-child {
    margin-right: 0;
  }
`;

const LogoName = styled.div`
  ${p_20_semibold};
  margin-top: 16px;
  text-transform: capitalize;
  line-height: 28px;
`;

const LogoSymbol = styled.div`
  ${p_14_normal};
  color: #a1a8b3;
`;

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailsTitle = styled.div`
  ${p_16_semibold};
`;

const DetailsItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const DetailsValue = styled.div`
  ${p_14_medium};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 4px;
`;

const DetailsNetwork = styled.span`
  margin-right: 8px;
`;

export default function Details({ space }) {
  const strategyCount = space.weightStrategy?.length || 0;
  const networkCount = space.networks?.length || 0;

  return (
    <Wrapper>
      <LogoWrapper>
        <SpaceLogo spaceId={space.id} />
        <LogoName>{space.name}</LogoName>
        <LogoSymbol>{space.symbol}</LogoSymbol>
      </LogoWrapper>

      <DetailsWrapper>
        <DetailsTitle>About</DetailsTitle>
        <img src="/imgs/icons/info.svg" />
      </DetailsWrapper>

      <Divider />

      <div>
        <DetailsItem>
          <div>Threshold</div>
          <DetailsValue>
            {toPrecision(space.proposeThreshold, space.decimals)} {space.symbol}
          </DetailsValue>
        </DetailsItem>

        <DetailsItem>
          <div>Strategies({strategyCount})</div>
          <div>
            {space.weightStrategy?.map((strategy, index) => (
              <DetailsValue key={index}>{strategy}</DetailsValue>
            ))}
          </div>
        </DetailsItem>

        <DetailsItem>
          <div>Networks({networkCount})</div>
          <div>
            {space.networks?.map((network, index) => (
              <DetailsValue key={index}>
                <DetailsNetwork>{capitalize(network.network)}</DetailsNetwork>{" "}
                <ChainIcon chainName={network.network} />
              </DetailsValue>
            ))}
          </div>
        </DetailsItem>
      </div>
    </Wrapper>
  );
}

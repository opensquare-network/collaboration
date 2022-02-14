import styled from "styled-components";
import { toPrecision } from "frontedUtils";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";
import Tooltip from "@/components/tooltip";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoName = styled.div`
  ${p_20_semibold};
  text-transform: capitalize;
`;

const LogoSymbol = styled.div`
  ${p_14_normal};
  color: #a1a8b3;
`;

const AboutWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AboutItem = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
`;

const AboutIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const AboutName = styled.div`
  ${p_16_semibold};
`;

const AboutDetail = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
  text-transform: capitalize;
`;

const StrategyAboutDetail = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
  text-overflow: ellipsis;
  max-width: 240px;
  overflow: hidden;
  white-space: nowrap;
`;

const AboutDivider = styled.div`
  width: 1px;
  height: 16px;
  background: #e2e8f0;
  margin: 0 40px;
`;

export default function ListInfo({ space }) {
  return (
    <Wrapper>
      <LogoWrapper>
        <SpaceLogo spaceId={space.id} />
        <div>
          <LogoName>{space.name}</LogoName>
          <LogoSymbol>{space.symbol}</LogoSymbol>
        </div>
      </LogoWrapper>
      <AboutWrapper>
        <AboutItem>
          <AboutIcon src="/imgs/icons/network.svg" />
          <div>
            <AboutName>Network</AboutName>
            <AboutDetail>{space.network}</AboutDetail>
          </div>
        </AboutItem>
        <AboutDivider />
        <AboutItem>
          <AboutIcon src="/imgs/icons/threshold.svg" />
          <div>
            <AboutName>Threshold</AboutName>
            <AboutDetail>{`${toPrecision(
              space.proposeThreshold,
              space.decimals
            )} ${space.symbol}`}</AboutDetail>
          </div>
          <Tooltip
            content={`At least ${toPrecision(
              space.proposeThreshold,
              space.decimals
            )}${space.symbol} to create a proposal`}
            size="full"
          >
            <div />
          </Tooltip>
        </AboutItem>
        <AboutDivider />
        <AboutItem>
          <AboutIcon src="/imgs/icons/strategy.svg" />
          <div>
            <AboutName>Strategies({space.weightStrategy?.length || 0})</AboutName>
            <StrategyAboutDetail>
              {space.weightStrategy?.join(", ")}
            </StrategyAboutDetail>
          </div>
          <Tooltip
            content={space.weightStrategy?.join(", ")}
            size="full"
          >
            <div />
          </Tooltip>
        </AboutItem>
      </AboutWrapper>
    </Wrapper>
  );
}

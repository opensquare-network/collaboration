import styled from "styled-components";
import { toPrecision } from "frontedUtils";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";
import Tooltip from "@/components/tooltip";
import ChainIcon from "./chain/chainIcon";
import { capitalize } from "frontedUtils";

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
  margin-bottom: 2px;
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
  max-width: 240px;
`;

const AboutDivider = styled.div`
  width: 1px;
  height: 16px;
  background: #e2e8f0;
  margin: 0 40px;
`;

const ChainIconsWrapper = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
`;

const ChainIcons = styled.div`
  display: flex;
  svg,
  img {
    margin-right: 4px;
    vertical-align: middle;
  }
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
            <AboutName>Strategy({space.weightStrategy?.length || 0})</AboutName>
            <StrategyAboutDetail>
              {space.weightStrategy?.[0]}
              {space.weightStrategy?.length > 1 && ", ..."}
            </StrategyAboutDetail>
          </div>
          <Tooltip content={space.weightStrategy?.join(", ")} size="full">
            <div />
          </Tooltip>
        </AboutItem>
        <AboutDivider />
        <AboutItem>
          <AboutIcon src="/imgs/icons/network.svg" />
          <div>
            <AboutName>Network({space.networks?.length || 0})</AboutName>
            <ChainIconsWrapper>
              <ChainIcons>
                {space.networks?.slice(0, 3).map((network, index) => (
                  <ChainIcon key={index} chainName={network.network} />
                ))}
                {space.networks?.length > 3 && "..."}
              </ChainIcons>
            </ChainIconsWrapper>
          </div>
          <Tooltip
            content={space.networks
              ?.map((item) => capitalize(item.network))
              .join(", ")}
            size="full"
          >
            <div />
          </Tooltip>
        </AboutItem>
      </AboutWrapper>
    </Wrapper>
  );
}

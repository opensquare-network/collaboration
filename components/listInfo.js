import styled from "styled-components";
import { toPrecision } from "utils";
import { h4_24_bold, p_14_normal, p_16_semibold, p_20_semibold } from "../styles/textStyles";

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

const LogoImg = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 24px;
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

const AboutDivider = styled.div`
  width: 1px;
  height: 16px;
  background: #e2e8f0;
  margin: 0 40px;
`;

export default function ListInfo({ spaceName, data }) {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoImg src={`/imgs/icons/${spaceName}.svg`} />
        <div>
          <LogoName>{spaceName}</LogoName>
          <LogoSymbol>{data.symbol}</LogoSymbol>
        </div>
      </LogoWrapper>
      <AboutWrapper>
        <AboutItem>
          <AboutIcon src="/imgs/icons/network.svg" />
          <div>
            <AboutName>Network</AboutName>
            <AboutDetail>{data.network}</AboutDetail>
          </div>
        </AboutItem>
        <AboutDivider />
        <AboutItem>
          <AboutIcon src="/imgs/icons/threshold.svg" />
          <div>
            <AboutName>Proposal threshold</AboutName>
            <AboutDetail>{`${toPrecision(data.proposeThreshold, data.decimals)} ${data.symbol}`}</AboutDetail>
          </div>
        </AboutItem>
        <AboutDivider />
        <AboutItem>
          <AboutIcon src="/imgs/icons/strategy.svg" />
          <div>
            <AboutName>Strategie(s)</AboutName>
            <AboutDetail>{data.weightStrategy}</AboutDetail>
          </div>
        </AboutItem>
      </AboutWrapper>
    </Wrapper>
  );
}

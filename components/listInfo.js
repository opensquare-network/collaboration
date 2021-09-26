import styled from "styled-components";
import { h4_24_bold, p_16_semibold } from "../styles/textStyles";

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
  ${h4_24_bold};
`;

const LogoSymbol = styled.div`
  font-size: 14px;
  line-height: 24px;
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
`;

const AboutDivider = styled.div`
  width: 1px;
  height: 16px;
  background: #e2e8f0;
  margin: 0 40px;
`;

export default function ListInfo({ data }) {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoImg src={`/imgs/icons/${data.icon}`} />
        <div>
          <LogoName>{data.name}</LogoName>
          <LogoSymbol>{data.symbol}</LogoSymbol>
        </div>
      </LogoWrapper>
      <AboutWrapper>
        <AboutItem>
          <AboutIcon src="/imgs/icons/network.svg" />
          <div>
            <AboutName>Network</AboutName>
            <AboutDetail>Kusama Mainnet</AboutDetail>
          </div>
        </AboutItem>
        <AboutDivider />
        <AboutItem>
          <AboutIcon src="/imgs/icons/threshold.svg" />
          <div>
            <AboutName>Proposal threshold</AboutName>
            <AboutDetail>100 KSM</AboutDetail>
          </div>
        </AboutItem>
        <AboutDivider />
        <AboutItem>
          <AboutIcon src="/imgs/icons/strategy.svg" />
          <div>
            <AboutName>Strategie(s)</AboutName>
            <AboutDetail>balance-of</AboutDetail>
          </div>
        </AboutItem>
      </AboutWrapper>
    </Wrapper>
  );
}

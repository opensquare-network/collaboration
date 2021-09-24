import styled from "styled-components";

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
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
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
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
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

export default function ListInfo() {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoImg src="/imgs/icons/kusama.svg" />
        <div>
          <LogoName>Kusama</LogoName>
          <LogoSymbol>KSM</LogoSymbol>
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

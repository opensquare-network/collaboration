import styled from "styled-components";
import {
  p_14_medium,
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";
import ChainIcon from "./chain/chainIcon";
import ValueDisplay from "./valueDisplay";
import Modal from "./modal";
import { useState } from "react";
import Divider from "./styled/divider";
import { capitalize, toPrecision } from "frontedUtils";

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
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
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
  display: flex;
`;

const ChainIcons = styled.div`
  display: flex;
  svg,
  img {
    margin-right: 4px;
    vertical-align: middle;
  }
`;

const ModalLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  // override 'SpaceLogo' margin-right
  > :first-child {
    margin-right: 0;
  }
`;

const ModalLogoName = styled(LogoName)`
  margin-top: 16px;
`;

const ModalAboutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalAboutTitle = styled.div`
  ${p_16_semibold};
`;

const ModalInfoWrapper = styled.div``;

const ModalInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ModalInfoName = styled.div``;

const ModalInfoValue = styled.div`
  ${p_14_medium};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 4px;
`;

const ModalInfoNetwork = styled.span`
  margin-right: 8px;
`;

export default function ListInfo({ space }) {
  const [modalOpen, setModalOpen] = useState(false);

  const strategyCount = space.weightStrategy?.length || 0;
  const networkCount = space.networks?.length || 0;

  const handleShowModal = () => {
    setModalOpen(true);
  };

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
            <AboutName onClick={handleShowModal}>Threshold</AboutName>
            <AboutDetail>
              <ValueDisplay
                value={space.proposeThreshold}
                space={space}
              ></ValueDisplay>
            </AboutDetail>
          </div>
        </AboutItem>
        <AboutDivider />
        <AboutItem>
          <AboutIcon src="/imgs/icons/strategy.svg" />
          <div>
            <AboutName onClick={handleShowModal}>
              Strategy({strategyCount})
            </AboutName>
            <StrategyAboutDetail>
              {space.weightStrategy?.[0]}
              {space.weightStrategy?.length > 1 && ", ..."}
            </StrategyAboutDetail>
          </div>
        </AboutItem>
        <AboutDivider />
        <AboutItem>
          <AboutIcon src="/imgs/icons/network.svg" />
          <div>
            <AboutName onClick={handleShowModal}>
              Network({networkCount})
            </AboutName>
            <ChainIconsWrapper>
              <ChainIcons>
                {space.networks?.slice(0, 3).map((network, index) => (
                  <ChainIcon key={index} chainName={network.network} />
                ))}
              </ChainIcons>
              {space.networks?.length > 3 && "..."}
            </ChainIconsWrapper>
          </div>
        </AboutItem>

        <Modal open={modalOpen} setOpen={setModalOpen}>
          <ModalLogoWrapper>
            <SpaceLogo spaceId={space.id} />
            <ModalLogoName>{space.name}</ModalLogoName>
            <LogoSymbol>{space.symbol}</LogoSymbol>
          </ModalLogoWrapper>

          <ModalAboutWrapper>
            <ModalAboutTitle>About</ModalAboutTitle>
            <img src="/imgs/icons/info.svg" />
          </ModalAboutWrapper>

          <Divider />

          <ModalInfoWrapper>
            <ModalInfoItem>
              <ModalInfoName>Threshold</ModalInfoName>
              <ModalInfoValue>
                {toPrecision(space.proposeThreshold, space.decimals)}{" "}
                {space.symbol}
              </ModalInfoValue>
            </ModalInfoItem>

            <ModalInfoItem>
              <ModalInfoName>Strategies({strategyCount})</ModalInfoName>
              <div>
                {space.weightStrategy?.map((strategy, index) => (
                  <ModalInfoValue key={index}>{strategy}</ModalInfoValue>
                ))}
              </div>
            </ModalInfoItem>

            <ModalInfoItem>
              <ModalInfoName>Networks({networkCount})</ModalInfoName>
              <div>
                {space.networks?.map((network, index) => (
                  <ModalInfoValue key={index}>
                    <ModalInfoNetwork>
                      {capitalize(network.network)}
                    </ModalInfoNetwork>{" "}
                    <ChainIcon chainName={network.network} />
                  </ModalInfoValue>
                ))}
              </div>
            </ModalInfoItem>
          </ModalInfoWrapper>
        </Modal>
      </AboutWrapper>
    </Wrapper>
  );
}

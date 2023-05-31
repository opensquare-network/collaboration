import styled from "styled-components";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "../../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";
import { ChainIcon } from "@osn/common-ui";
import ValueDisplay from "../valueDisplay";
import Modal from "@osn/common-ui/es/Modal";
import { useState } from "react";
import Details from "./details";
import { Flex, FlexBetween } from "@osn/common-ui";

const Wrapper = styled(FlexBetween)`
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const LogoName = styled.div`
  ${p_20_semibold};
  text-transform: capitalize;
`;

const LogoSymbol = styled.div`
  ${p_14_normal};
  color: #a1a8b3;
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
  ${p_14_normal};
  color: #a1a8b3;
`;

const StrategyAboutDetail = styled.span`
  ${p_14_normal};
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
  ${p_14_normal};
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

export default function ListInfo({ space }) {
  const [modalOpen, setModalOpen] = useState(false);

  const strategyCount = space.weightStrategy?.length || 0;
  const networkCount = space.networks?.length || 0;

  const handleShowModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Wrapper>
      <Flex>
        <SpaceLogo space={space} />
        <div>
          <LogoName>{space.name}</LogoName>
          <LogoSymbol>{space.symbol}</LogoSymbol>
        </div>
      </Flex>
      <Flex>
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
        <AboutDivider />
        <AboutItem>
          <AboutIcon src="/imgs/icons/threshold.svg" />
          <div>
            <AboutName onClick={handleShowModal}>Threshold</AboutName>
            <AboutDetail>
              <ValueDisplay value={space.proposeThreshold} space={space} />
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
            <StrategyAboutDetail title={space.weightStrategy?.join(", ")}>
              {space.weightStrategy?.[0]}
              {space.weightStrategy?.length > 1 && ", ..."}
            </StrategyAboutDetail>
          </div>
        </AboutItem>

        <Modal
          open={modalOpen}
          setOpen={setModalOpen}
          okText="Close"
          okButtonProps={{ primary: false }}
          onOk={handleCloseModal}
        >
          <Details space={space} />
        </Modal>
      </Flex>
    </Wrapper>
  );
}

import styled from "styled-components";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "../../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";
import ValueDisplay from "../valueDisplay";
import Modal from "@osn/common-ui/es/Modal";
import { useMemo, useState } from "react";
import Details from "./details";
import {
  SystemMembers,
  SystemStrategy,
  SystemThreshold,
} from "@osn/icons/opensquare";
import { Flex, FlexBetween } from "@osn/common-ui";
import { AvatarWithTooltip } from "../avatar";
import { isCollectiveSpace } from "frontedUtils/space";

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
  color: var(--textTertiary);
`;

const AboutItem = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
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
  color: var(--textTertiary);
`;

const StrategyAboutDetail = styled.span`
  ${p_14_normal};
  color: var(--textTertiary);
  max-width: 240px;
`;

const AboutDivider = styled.div`
  width: 1px;
  height: 16px;
  background: var(--fillBgBrandDisable);
  margin: 0 40px;
`;

const AvatarIconsWrapper = styled.div`
  ${p_14_normal};
  line-height: 20px;
  color: var(--textTertiary);
  display: flex;
  align-items: center;
`;

const AvatarIcons = styled.div`
  display: flex;
  svg,
  img {
    margin-right: -4px;
    vertical-align: middle;
  }
`;

export default function ListInfo({ space }) {
  const [modalOpen, setModalOpen] = useState(false);
  const memebers = useMemo(() => {
    if (isCollectiveSpace(space.type)) {
      return space.members || [];
    }
    return space.whitelist || [];
  }, [space.members, space.type, space.whitelist]);

  const strategyCount = space.weightStrategy?.length || 0;

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
        {memebers.length > 0 && (
          <>
            <AboutItem>
              <SystemMembers className="w-6 h-6 mr-2 text-textTertiary" />
              <div>
                <AboutName role="button" onClick={handleShowModal}>
                  Members({memebers.length})
                </AboutName>
                <AvatarIconsWrapper>
                  <AvatarIcons>
                    {memebers?.slice(0, 5).map((address, index) => (
                      <AvatarWithTooltip
                        key={index}
                        address={address}
                        network="polkadot"
                        size={20}
                        isCollective={isCollectiveSpace(space.type)}
                      />
                    ))}
                  </AvatarIcons>
                  {space.whitelist?.length > 5 && (
                    <span className="text-textTertiary ml-3">...</span>
                  )}
                </AvatarIconsWrapper>
              </div>
            </AboutItem>
            <AboutDivider />
          </>
        )}
        {space.proposeThreshold && (
          <>
            <AboutItem>
              <SystemThreshold className="w-6 h-6 mr-2 text-textTertiary" />
              <div>
                <AboutName role="button" onClick={handleShowModal}>
                  Threshold
                </AboutName>
                <AboutDetail>
                  <ValueDisplay value={space.proposeThreshold} space={space} />
                </AboutDetail>
              </div>
            </AboutItem>
            <AboutDivider />
          </>
        )}
        <AboutItem>
          <SystemStrategy className="w-6 h-6 mr-2 text-textTertiary" />
          <div>
            <AboutName role="button" onClick={handleShowModal}>
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

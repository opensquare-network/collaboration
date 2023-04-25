import styled from "styled-components";

import Author from "./author";
import InternalLink from "components/internalLink";
import HardLink from "components/hardLink";
import { p_16_semibold } from "styles/textStyles";
import { shadow_100, shadow_200 } from "styles/globalCss";
import StatusTag from "./statusTag";
import PostTime from "./postTime";
import { p_24 } from "../styles/paddings";
import { useEffect, useState } from "react";
import { useWindowSize } from "../frontedUtils/hooks";
import PostResult from "./postResult";
import { findNetworkConfig } from "../services/util";
import { Flex, FlexBetween } from "@osn/common-ui";
import { p_14_medium } from "../styles/componentCss";
import { getSpaceIconUrl } from "frontedUtils/space";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  ${shadow_100}
  ${p_24};

  :hover {
    border-color: #e2e8f0;

    ${shadow_200}
    .icon > svg {
      display: block;
    }
  }
`;

const Title = styled.h3`
  font-family: Inter, serif;
  font-style: normal;
  display: inline-block;
  ${p_16_semibold};
  flex-grow: 1;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 16px 0;
`;

const InfoWrapper = styled(FlexBetween)`
  flex-wrap: wrap;
`;

const LeftWrapper = styled(Flex)`
  line-height: 24px;
  color: #a1a8b3;
  flex-wrap: wrap;

  > :not(:first-child)::before {
    content: "·";
    margin: 0 8px;
  }
`;

const FromSpace = styled(Flex)`
  .ml-4px {
    margin-left: 8px;
  }
`;

const SpaceName = styled.a`
  text-transform: capitalize;
  margin-left: 6px;
  ${p_14_medium};
  color: #1e2134 !important;

  :hover {
    text-decoration-line: underline;
  }
`;

const TitleWrapper = styled(FlexBetween)`
  align-items: flex-start;
`;

export default function Post({ data, showSpace, space, spaces }) {
  const getSpaceFromId = (spaceId) => spaces?.[spaceId];
  const getSpaceDisplayName = (spaceId) => getSpaceFromId(spaceId)?.name;
  const windowSize = useWindowSize();
  const [showRichInfo, setShowRichInfo] = useState(true);

  useEffect(() => {
    if (windowSize.width <= 900) {
      setShowRichInfo(false);
    } else {
      setShowRichInfo(true);
    }
  }, [windowSize.width, setShowRichInfo]);

  const proposerNetworkConfig = findNetworkConfig(
    data.networksConfig,
    data.proposerNetwork,
  );
  const spaceSupportMultiChain = proposerNetworkConfig?.networks?.length > 1;

  const spaceInfo = space ?? getSpaceFromId(data.space);
  const spaceIcon = getSpaceIconUrl(spaceInfo);

  return (
    <Wrapper>
      <TitleWrapper>
        <HardLink href={`/space/${data.space}/proposal/${data.cid}`}>
          <Title>{data.title}</Title>
        </HardLink>
        <PostResult data={data} space={spaceInfo} />
      </TitleWrapper>
      <Divider />
      <InfoWrapper>
        <LeftWrapper>
          {showRichInfo && (
            <Author
              address={data.proposer ?? data.address}
              space={proposerNetworkConfig}
              showNetwork={spaceSupportMultiChain}
            />
          )}
          {!showRichInfo && (
            <img width="20px" height="20px" src={spaceIcon} alt="" />
          )}
          <PostTime post={data} />
          {showSpace && showRichInfo && (
            <FromSpace>
              From
              <img
                width="20px"
                height="20px"
                className="ml-4px"
                src={spaceIcon}
                alt=""
              />
              <InternalLink href={`/space/${data.space}`}>
                <SpaceName>{getSpaceDisplayName(data.space)}</SpaceName>
              </InternalLink>
            </FromSpace>
          )}
        </LeftWrapper>
        <StatusTag>{data.status}</StatusTag>
      </InfoWrapper>
    </Wrapper>
  );
}

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

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  ${shadow_100}
  ${p_24};
  cursor: pointer;
  :hover {
    border-color: #e2e8f0;
    ${shadow_200}
    .icon > svg {
      display: block;
    }
  }
`;

const Title = styled.div`
  display: inline-block;
  ${p_16_semibold};
  flex-grow: 1;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 16px 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
  color: #a1a8b3;
  flex-wrap: wrap;

  > :not(:first-child)::before {
    content: "·";
    margin: 0 8px;
  }
`;

const FromSpace = styled.div`
  display: flex;
  align-items: center;

  .ml-4px {
    margin-left: 8px;
  }
`;

const SpaceName = styled.a`
  text-transform: capitalize;
  margin-left: 6px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #1e2134 !important;

  :hover {
    text-decoration-line: underline;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ProjectIcons = {
  kintsugi: "project-kintsugi.png",
  polarisdao: "project-polarisdao.png",
};

const getProjectIcon = (spaceId) => {
  const icon = ProjectIcons[spaceId] || `project-${spaceId}.svg`;
  return `/imgs/icons/${icon}`;
};

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

  const icon = getProjectIcon(data.space);

  return (
    <HardLink href={`/space/${data.space}/proposal/${data.cid}`}>
      <Wrapper>
        <TitleWrapper>
          <Title>{data.title}</Title>
          <PostResult data={data} space={space ?? getSpaceFromId(data.space)} />
        </TitleWrapper>
        <Divider />
        <InfoWrapper>
          <LeftWrapper>
            {showRichInfo && (
              <Author
                address={data.proposer ?? data.address}
                space={space ?? getSpaceFromId(data.space)}
              />
            )}
            {!showRichInfo && (
              <img width="20px" height="20px" src={icon} alt="" />
            )}
            <PostTime post={data} />
            {showSpace && showRichInfo && (
              <FromSpace>
                From
                <img
                  width="20px"
                  height="20px"
                  className="ml-4px"
                  src={icon}
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
    </HardLink>
  );
}

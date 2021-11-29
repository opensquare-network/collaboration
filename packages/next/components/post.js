import styled from "styled-components";

import Author from "./author";
import InternalLink from "components/internalLink";
import { p_16_medium } from "styles/textStyles";
import StatusTag from "./statusTag";
import PostTime from "./postTime";
import { p_24 } from "../styles/paddings";
import { useEffect, useState } from "react";
import { useWindowSize } from "../frontedUtils/hooks";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
  0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  ${p_24};
  cursor: pointer;
  :hover{
    border-color: #E2E8F0;;
  }
`;

const Title = styled.div`
  display: inline-block;
  ${p_16_medium};
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


export default function Post({data, showSpace, network, spaces}) {
  const getSpaceNetwork = (space) => spaces?.[space];
  const getSpaceName = (space) => spaces?.[space]?.name;
  const windowSize = useWindowSize();

  const [showRichInfo, setShowRichInfo] = useState(true);

  useEffect(() => {
    if (windowSize.width <= 900) {
      setShowRichInfo(false);
    } else {
      setShowRichInfo(true);
    }
  }, [windowSize.width, setShowRichInfo]);

  return (
    <InternalLink href={`/space/${data.space}/proposal/${data.cid}`}>
      <Wrapper>
        <Title>{data.title}</Title>
        <Divider/>
        <InfoWrapper>
          <LeftWrapper>
            {showRichInfo && <Author
              address={data.address}
              network={network ?? getSpaceNetwork(data.space)}
            />
            }
            {
              !showRichInfo && <img src={`/imgs/icons/project-${data.space}.svg`} alt=""/>
            }
            <PostTime post={data}/>
            {showSpace && showRichInfo && (
              <FromSpace>
                From
                <img className="ml-4px" src={`/imgs/icons/project-${data.space}.svg`} alt=""/>
                <InternalLink href={`/space/${data.space}`}>
                  <SpaceName>{getSpaceName(data.space)}</SpaceName>
                </InternalLink>
              </FromSpace>
            )}
          </LeftWrapper>
          <StatusTag>{data.status}</StatusTag>
        </InfoWrapper>
      </Wrapper>
    </InternalLink>
  );
}

import styled from "styled-components";

import Author from "./author";
import InternalLink from "components/internalLink";
import { p_18_medium } from "styles/textStyles";
import StatusTag from "./statusTag";
import PostTime from "./postTime";
import { p_24 } from "../styles/paddings";
import { useEffect, useState } from "react";
import { useWindowSize } from "../utils/hooks";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  ${p_24};
`;

const Title = styled.div`
  display: inline-block;
  ${p_18_medium};
  :hover {
    text-decoration: underline;
  }
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

const PCOnly = styled.div`
  @media screen and (max-width: 800px) {
    display: none;
  }
`

export default function Post({ data, showSpace, network, spaces }) {
  const getSpaceNetwork = (space) => {
    return spaces?.[space];
  };
  const windowSize = useWindowSize();

  const [showRichInfo, setShowRichInfo ] = useState(true);

  useEffect(()=> {
    if (windowSize.width <= 900) {
      setShowRichInfo(false);
    } else {
      setShowRichInfo(true);
    }
  },[windowSize.width, setShowRichInfo]);

  return (
    <Wrapper>
      <InternalLink href={`/space/${data.space}/${data.cid}`}>
        <Title>{data.title}</Title>
      </InternalLink>
      <Divider />
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
          <PostTime post={data} />
          {showSpace && showRichInfo && (
            <FromSpace>
              From
              <img src={`/imgs/icons/project-${data.space}.svg`} alt=""/>
              <InternalLink href={`/space/${data.space}`}>
                <SpaceName>{data.space}</SpaceName>
              </InternalLink>
            </FromSpace>
          )}
        </LeftWrapper>
        <StatusTag>{data.status}</StatusTag>
      </InfoWrapper>
    </Wrapper>
  );
}

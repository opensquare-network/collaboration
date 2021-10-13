import styled from "styled-components";

import Author from "./author";
import InternalLink from "components/internalLink";
import { p_18_medium } from "styles/textStyles";
import StatusTag from "./statusTag";
import PostTime from "./postTime";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  padding: 24px 32px;
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
  margin: 20px 0;
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

export default function Post({ data, showSpace, network }) {
  return (
    <Wrapper>
      <InternalLink href={`/space/${data.space}/${data.postUid}`}>
        <Title>{data.title}</Title>
      </InternalLink>
      <Divider />
      <InfoWrapper>
        <LeftWrapper>
          <Author address={data.address} network={network?.network} />
          <PostTime post={data} />
          {showSpace && (
            <FromSpace>
              From
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

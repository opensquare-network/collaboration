import styled, { css } from "styled-components";

import PostVote from "./postVote";
import Author from "components/author";
import { p_14_normal, p_16_semibold, p_18_semibold } from "styles/textStyles";
import PostTime from "components/postTime";
import Markdown from "components/markdown";
import StatusTag from "components/statusTag";

const Wrapper = styled.div`
  padding: 32px;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }
`;

const Title = styled.div`
  ${p_18_semibold};
  margin-bottom: 16px;
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

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 32px 0;
  ${(p) =>
          p.margin &&
          css`
            margin: ${p.margin}px 0;
          `
  }
`;

const SubTitle = styled.div`
  ${p_16_semibold};
  margin-bottom: 16px;
`;

const Content = styled.div`
  ${p_14_normal};
  color: #506176;
`;

export default function PostContent({ data, network }) {
  return (
    <Wrapper>
      <Title>{data?.title}</Title>
      <InfoWrapper>
        <LeftWrapper>
          <Author address={data.address} network={network} />
          <PostTime post={data} />
        </LeftWrapper>
        <StatusTag>{data.status}</StatusTag>
      </InfoWrapper>
      <Divider margin={16} />
      <SubTitle>Description</SubTitle>
      <Content>
        <Markdown content={data?.content} />
      </Content>
      <Divider />
      <PostVote data={data} network={network} />
    </Wrapper>
  );
}

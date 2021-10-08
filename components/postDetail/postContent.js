import styled from "styled-components";

import Author from "components/author";
import PostVote from "./postVote";
import { p_16_normal, p_18_semibold, p_20_semibold } from "styles/textStyles";
import { timeDuration } from "utils";
import Mardown from "components/markdown";

const Wrapper = styled.div`
  padding: 40px;
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
  ${p_20_semibold};
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

const Status = styled.div`
  padding: 3px 12px;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  background: ${(p) => (p.active ? "#04d2c5" : "#e2e8f0")};
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 20px 0;
`;

const SubTitle = styled.div`
  ${p_18_semibold};
  margin-bottom: 16px;
`;

const Content = styled.div`
  ${p_16_normal};
  color: #a1a8b3;
`;

export default function PostContent({ data }) {
  console.log({ data });
  return (
    <Wrapper>
      <Title>{data?.title}</Title>
      <InfoWrapper>
        <LeftWrapper>
          <Author address={data.address} />
          <div>{timeDuration(data.createdAt)}</div>
        </LeftWrapper>
        {data?.status && (
          <Status active={data.status === "active"}>{data.status}</Status>
        )}
      </InfoWrapper>
      <Divider />
      <SubTitle>Description</SubTitle>
      <Mardown content={data?.content} />
      <Divider />
      <PostVote />
    </Wrapper>
  );
}

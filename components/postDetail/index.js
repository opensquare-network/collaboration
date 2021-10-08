import styled from "styled-components";

import PostContent from "./postContent";
import PostTab from "./postTab";
import PostInfo from "./postInfo";
import PostResults from "./postResults";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 22px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const MainWrapper = styled.div`
  flex: 1 1 auto;
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const SiderWrapper = styled.div`
  flex: 0 0 290px;
  max-width: 290px;
  margin-left: 20px;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    flex-basis: auto;
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
    max-width: none;
  }
`;

export default function PostDetail({ data }) {
  return (
    <Wrapper>
      <MainWrapper>
        <PostContent data={data} />
        <PostTab data={data} />
      </MainWrapper>
      <SiderWrapper>
        <PostInfo data={data} />
        <PostResults />
      </SiderWrapper>
    </Wrapper>
  );
}

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
  @media screen and (max-width: 800px) {
    width: 100%;
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

export default function PostDetail({
  data,
  space,
  votes,
  voteStatus,
  comments,
  defaultPage,
  myVote,
}) {
  return (
    <Wrapper>
      <MainWrapper>
        <PostContent data={data} space={space} />
        <PostTab
          data={data}
          space={space}
          votes={votes}
          comments={comments}
          defaultPage={defaultPage}
          myVote={myVote}
        />
      </MainWrapper>
      <SiderWrapper>
        <PostInfo data={data} space={space} />
        <PostResults data={data} voteStatus={voteStatus} space={space} />
      </SiderWrapper>
    </Wrapper>
  );
}

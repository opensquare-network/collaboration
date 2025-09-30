import styled from "styled-components";

import PostContent from "./postContent";
import PostInfo from "./postInfo";
import PostResults from "./postResults";
import PostVotes from "@/components/postDetail/postVotes";
import PostDiscussion from "./postDiscussion";
import { useJumpToAnchor } from "hooks/notification/useAnchor";
import { useSuggestions } from "./suggestions";

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
  /* 100% - sider width - sider margin-left */
  max-width: calc(100% - 300px - 20px);
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    max-width: 100%;
  }
`;

const SiderWrapper = styled.div`
  flex: 0 0 300px;
  max-width: 300px;
  margin-left: 20px;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    display: none;
    flex-basis: auto;
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
    max-width: none;
  }
`;

const MobileOnly = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
  > :not(:first-child) {
    margin-top: 20px;
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
  isSafari = false,
}) {
  const { loadSuggestions } = useSuggestions(comments, votes);
  useJumpToAnchor();
  return (
    <Wrapper>
      <MainWrapper>
        <PostContent
          data={data}
          space={space}
          loadSuggestions={loadSuggestions}
        />
        <MobileOnly>
          <PostResults data={data} voteStatus={voteStatus} space={space} />
          <PostInfo data={data} space={space} />
        </MobileOnly>
        <PostVotes
          proposal={data}
          votes={votes}
          myVote={myVote}
          discussionPage={defaultPage?.discussionPage}
          isSafari={isSafari}
        />
        <PostDiscussion
          proposal={data}
          comments={comments}
          space={space}
          loadSuggestions={loadSuggestions}
        />
      </MainWrapper>
      <SiderWrapper>
        <PostInfo data={data} space={space} />
        <PostResults data={data} voteStatus={voteStatus} space={space} />
      </SiderWrapper>
    </Wrapper>
  );
}

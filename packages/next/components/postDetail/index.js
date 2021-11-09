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
  network,
  votes,
  voteStatus,
  comments,
  defaultPage,
}) {
  return (
    <Wrapper>
      <MainWrapper>
        <PostContent data={data} network={network} />
        <PostTab
          data={data}
          network={network}
          votes={votes}
          comments={comments}
          defaultPage={defaultPage}
        />
      </MainWrapper>
      <SiderWrapper>
        <PostInfo data={data} network={network} />
        <PostResults data={data} voteStatus={voteStatus} network={network} />
      </SiderWrapper>
    </Wrapper>
  );
}

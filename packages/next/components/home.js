import styled from "styled-components";

import Space from "./space";
import PostList from "./postList";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 24px;
  }
`;

export default function Home({ spaces, hottestProposals, showAllSpace }) {
  return (
    <Wrapper>
      <Space spaces={spaces} showAllSpace={showAllSpace} />
      <PostList
        title="Hottest Proposals"
        posts={hottestProposals}
        showSpace={true}
        spaces={spaces}
      />
    </Wrapper>
  );
}

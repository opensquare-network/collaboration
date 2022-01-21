import styled from "styled-components";

import Space from "common/components/space";
import PostList from "./postList";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 24px;
  }
`;

export default function Home({ spaces, hottestProposals }) {
  return (
    <Wrapper>
      <Space spaces={spaces} />
      <PostList
        title="Hottest Proposals"
        posts={hottestProposals}
        showSpace={true}
        spaces={spaces}
      />
    </Wrapper>
  );
}

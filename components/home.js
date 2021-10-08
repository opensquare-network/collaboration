import styled from "styled-components";

import Space from "./space";
import PostList from "./postList";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 40px;
  }
`;

export default function Home({ spaces, hotestProposals }) {
  return (
    <Wrapper>
      <Space spaces={spaces} />
      <PostList title="Hotest Proposals" posts={hotestProposals} showSpace={true} />
    </Wrapper>
  );
}

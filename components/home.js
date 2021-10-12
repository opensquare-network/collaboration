import styled from "styled-components";

import Space from "./space";
import PostList from "./postList";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 40px;
  }
`;

export default function Home({ spaces, hottestProposals }) {
  return (
    <Wrapper>
      <Space spaces={spaces} />
      <PostList title="Hottest Proposals" posts={hottestProposals} showSpace={true} />
    </Wrapper>
  );
}

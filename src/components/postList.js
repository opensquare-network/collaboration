import styled from "styled-components";

import Post from "./post";

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 24px;
`;

const PostsWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

export default function PostList({ title, posts }) {
  return (
    <div>
      {title && <Title>{title}</Title>}
      <PostsWrapper>
        {posts.map((item, index) => (
          <Post key={index} data={item} />
        ))}
      </PostsWrapper>
    </div>
  );
}

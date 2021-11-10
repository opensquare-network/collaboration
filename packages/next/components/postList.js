import styled from "styled-components";

import Post from "./post";
import { p_20_semibold } from "../styles/textStyles";
import NoPost from "./noPost";
import Pagination from "@/components/pagination";

const Title = styled.div`
  ${p_20_semibold};
  margin-bottom: 20px;
`;

const PostsWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

export default function PostList({
  title,
  posts,
  network,
  spaces,
  showSpace = false,
}) {
  const items = Array.isArray(posts) ? posts : posts?.items ?? [];
  return (
    <div>
      {title && <Title>{title}</Title>}
      <PostsWrapper>
        {items.map((item, index) => (
          <Post
            key={index}
            data={item}
            showSpace={showSpace}
            network={network}
            spaces={spaces}
          />
        ))}
        {items.length === 0 && <NoPost />}
        {posts?.page && (
          <Pagination
            page={posts?.page}
            total={posts?.total}
            pageSize={posts?.pageSize}
          />
        )}
      </PostsWrapper>
    </div>
  );
}

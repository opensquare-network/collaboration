import styled from "styled-components";

import Post from "./post";
import { p_20_semibold } from "../styles/textStyles";
import Pagination from "@/components/pagination";
import NoData from "@osn/common-ui/es/NoData";

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
  space,
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
            space={space}
            spaces={spaces}
          />
        ))}
        {items.length === 0 && <NoData message="No current active proposals" />}
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

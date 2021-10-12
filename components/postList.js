import styled from "styled-components";

import Post from "./post";
import { p_20_semibold } from "../styles/textStyles";
import NoPost from "./noPost";
import Pagination from "@/components/pagination";

const Title = styled.div`
  ${p_20_semibold};
  margin-bottom: 24px;
`;

const PostsWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

export default function PostList({ title, posts, showSpace = false, showPagination= true }) {
  return (
    <div>
      {title && <Title>{title}</Title>}
      <PostsWrapper>
        {(posts?.items || []).map((item, index) => (
          <Post key={index} data={item} showSpace={showSpace} />
        ))}
        {(!posts || posts.length === 0) && <NoPost />}
        {
          showPagination && <Pagination
            page={posts?.page}
            total={posts?.total}
            pageSize={posts?.pageSize}
          />
        }
      </PostsWrapper>
    </div>
  );
}

import styled from "styled-components";

import Layout from "components/layout";
import Nav from "components/nav";
import ListInfo from "components/listInfo";
import ListTab from "components/listTab";
import PostList from "components/postList";
import { LIST_POST_ITEMS, SPACE_ITEMS } from "utils/constants";
import { useChain } from "utils/hooks";
import nextApi from "services/nextApi";

const HeaderWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 40px;
  }
  @media screen and (max-width: 800px) {
    > :not(:first-child) {
      margin-top: 20px;
    }
  }
`;

const PostWrapper = styled.div`
  margin-top: 24px;
`;

export default function List({ posts }) {
  const chain = useChain();
  const item = SPACE_ITEMS.find((item) => item.value === chain);

  console.log({ posts });

  return (
    <Layout bgHeight="252px">
      <HeaderWrapper>
        {item && (
          <Nav data={[{ name: "Space", link: "/" }, { name: item.name }]} />
        )}
        <ListInfo data={item} />
        <ListTab />
      </HeaderWrapper>
      <PostWrapper>
        <PostList posts={posts} />
      </PostWrapper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { chain, page } = context.query;
  const nPage = parseInt(page) || 1;

  const { result: posts } = await nextApi.fetch(`${chain}/proposals`, {
    page: nPage - 1,
    pageSize: 25,
  });

  return {
    props: { posts },
  };
}

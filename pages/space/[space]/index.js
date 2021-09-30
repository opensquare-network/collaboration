import styled from "styled-components";

import Layout from "components/layout";
import Nav from "components/nav";
import ListInfo from "components/listInfo";
import ListTab from "components/listTab";
import PostList from "components/postList";
import { EmptyQuery } from "utils/constants";
import ssrNextApi from "services/nextApi";

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

export default function List({ spaceName, space, proposals }) {
  if (!space) {
    return null;
  }

  return (
    <Layout bgHeight="252px">
      <HeaderWrapper>
        {space && (
          <Nav data={[
            { name: "Space", link: "/" },
            { name: spaceName }
          ]} />
        )}
        <ListInfo spaceName={spaceName} data={space} />
        <ListTab />
      </HeaderWrapper>
      <PostWrapper>
        <PostList posts={proposals} />
      </PostWrapper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { space: spaceName } = context.params;
  const { page } = context.query;
  const nPage = parseInt(page) || 1;

  const [
    { result: space },
    { result: proposals },
  ] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceName}`),
    ssrNextApi.fetch(`${spaceName}/proposals`, {
      page: nPage - 1,
      pageSize: 25,
    }),
  ]);

  return {
    props: {
      spaceName,
      space: space || null,
      proposals: proposals ?? EmptyQuery
    },
  };
}

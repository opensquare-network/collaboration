import styled from "styled-components";

import Layout from "components/layout";
import Nav from "components/nav";
import { LIST_NAV_ITEMS } from "utils/constants";
import ListInfo from "components/listInfo";
import ListTab from "components/listTab";
import PostList from "components/postList";
import { LIST_POST_ITEMS } from "utils/constants";

const HeaderWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 40px;
  }
  @media screen and (max-width: 900px) {
    > :not(:first-child) {
      margin-top: 20px;
    }
  }
`;

const PostWrapper = styled.div`
  margin-top: 24px;
`;

export default function List() {
  return (
    <Layout bgHeight="252px">
      <HeaderWrapper>
        <Nav data={LIST_NAV_ITEMS} />
        <ListInfo />
        <ListTab />
      </HeaderWrapper>
      <PostWrapper>
        <PostList posts={LIST_POST_ITEMS} />
      </PostWrapper>
    </Layout>
  );
}

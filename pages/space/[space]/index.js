import { useState } from "react";
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

export default function List({
  spaceName,
  spaceData,
  proposals,
  pendingProposals,
  activeProposals,
  closedProposals,
  activeTab,
}) {
  if (!spaceData) {
    return null;
  }

  const [tab, setTab] = useState(activeTab);

  let proposalList = EmptyQuery;
  if (!tab || tab === "all") {
    proposalList = proposals;
  } else if (tab === "pending") {
    proposalList = pendingProposals;
  } else if (tab === "active") {
    proposalList = activeProposals;
  } else if (tab === "closed") {
    proposalList = closedProposals;
  }

  return (
    <Layout bgHeight="252px">
      <HeaderWrapper>
        <Nav data={[
          { name: "Space", link: "/" },
          { name: spaceName }
        ]} />
        <ListInfo spaceName={spaceName} data={spaceData} />
        <ListTab space={spaceName} activeTab={activeTab} onActiveTab={setTab} />
      </HeaderWrapper>
      <PostWrapper>
        <PostList posts={proposalList} />
      </PostWrapper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { space: spaceName } = context.params;
  const { tab, page } = context.query;
  const nPage = parseInt(page) || 1;
  const activeTab = tab || "all";

  const pageSize = 25;

  const [
    { result: spaceData },
    { result: proposals },
    { result: pendingProposals },
    { result: activeProposals },
    { result: closedProposals },
  ] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceName}`),
    ssrNextApi.fetch(`${spaceName}/proposals`, {
      page: activeTab === "all" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceName}/proposals/pending`, {
      page: activeTab === "pending" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceName}/proposals/active`, {
      page: activeTab === "active" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceName}/proposals/closed`, {
      page: activeTab === "closed" ? nPage : 1,
      pageSize,
    }),
  ]);

  return {
    props: {
      spaceName,
      spaceData: spaceData || null,
      activeTab,
      proposals: proposals ?? EmptyQuery,
      pendingProposals: pendingProposals ?? EmptyQuery,
      activeProposals: activeProposals ?? EmptyQuery,
      closedProposals: closedProposals ?? EmptyQuery,
    },
  };
}

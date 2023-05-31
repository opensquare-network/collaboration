import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "components/layout";
import Breadcrumb from "components/breadcrumb";
import ListInfo from "components/listInfo";
import ListTab from "components/listTab";
import PostList from "components/postList";
import { EmptyQuery } from "frontedUtils/constants";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";
import Seo from "@/components/seo";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import pick from "lodash.pick";

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
  spaceId,
  space,
  proposals,
  pendingProposals,
  activeProposals,
  closedProposals,
  activeTab,
  defaultPage,
}) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(activeTab);

  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        space?.networks?.map((item) => pick(item, ["network", "ss58Format"])) ||
          [],
      ),
    );
  }, [dispatch, space]);

  if (!space) {
    return null;
  }

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

  const desc = `Space for ${space.name} off-chain voting. You can create, view, and vote proposals. Join ${space.name} off-chain governance!`;
  return (
    <>
      <Seo space={space} title={`${space.name} off-chain voting`} desc={desc} />
      <Layout bgHeight="264px" networks={space.networks}>
        <HeaderWrapper>
          <Breadcrumb
            routes={[
              { name: "Home", link: "/" },
              {
                name: (
                  <span style={{ textTransform: "capitalize" }}>
                    {space.name}
                  </span>
                ),
              },
            ]}
          />
          <ListInfo spaceId={spaceId} space={space} />
          <ListTab
            spaceId={spaceId}
            activeTab={activeTab}
            onActiveTab={setTab}
            defaultPage={defaultPage}
          />
        </HeaderWrapper>
        <PostWrapper>
          <PostList posts={proposalList} space={space} />
        </PostWrapper>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { space: spaceId } = context.params;
  const { tab, page } = context.query;
  const nPage = parseInt(page) || 1;
  const activeTab = tab || "all";

  const pageSize = 20;

  const [
    { result: space },
    { result: proposals },
    { result: pendingProposals },
    { result: activeProposals },
    { result: closedProposals },
  ] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceId}`),
    ssrNextApi.fetch(`${spaceId}/proposals`, {
      page: activeTab === "all" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceId}/proposals/pending`, {
      page: activeTab === "pending" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceId}/proposals/active`, {
      page: activeTab === "active" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceId}/proposals/closed`, {
      page: activeTab === "closed" ? nPage : 1,
      pageSize,
    }),
  ]);

  if (!space) {
    to404(context);
  }

  return {
    props: {
      spaceId,
      space: space || null,
      activeTab,
      proposals: proposals ?? EmptyQuery,
      pendingProposals: pendingProposals ?? EmptyQuery,
      activeProposals: activeProposals ?? EmptyQuery,
      closedProposals: closedProposals ?? EmptyQuery,
      defaultPage: { tab: activeTab ?? null, page: nPage },
    },
  };
}

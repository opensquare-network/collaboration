import Layout from "components/layout";
import Nav from "components/nav";
import PostDetail from "@/components/postDetail/index";
import { useSpace } from "utils/hooks";
import { SPACE_ITEMS } from "utils/constants";
import ssrNextApi from "services/nextApi";
import { EmptyQuery } from "utils/constants";

export default function Index({
  detail,
  network,
  votes,
  comments,
  defaultPage,
}) {
  const space = useSpace();
  const item = SPACE_ITEMS.find((item) => item.value === space);

  return (
    <Layout bgHeight="183px">
      {item && (
        <Nav
          data={[
            { name: "Space", link: "/" },
            { name: item?.name, link: `/space/${item?.value}`, back: true },
            { name: "Proposal" },
          ]}
        />
      )}
      <PostDetail
        data={detail}
        network={network}
        votes={votes}
        comments={comments}
        defaultPage={defaultPage}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id, space: spaceName } = context.params;
  const { page, tab } = context.query;

  const nPage = parseInt(page) || 1;
  const activeTab = tab ?? "votes";

  const { result: detail } = await ssrNextApi.fetch(
    `${spaceName}/proposals/${id}`
  );
  const { result: network } = await ssrNextApi.fetch(`spaces/${spaceName}`);
  const { result: votes } = await ssrNextApi.fetch(
    `${spaceName}/proposals/${detail?._id}/votes`,
    { page: activeTab === "votes" ? nPage : 1 }
  );
  const { result: comments } = await ssrNextApi.fetch(
    `${spaceName}/proposals/${detail?._id}/comments`,
    { page: activeTab === "discussion" ? nPage : 1 }
  );

  return {
    props: {
      detail: detail ?? null,
      network: network ?? null,
      votes: votes ?? EmptyQuery,
      comments: comments ?? EmptyQuery,
      defaultPage: { tab: activeTab ?? null, page: nPage },
    },
  };
}

import Layout from "components/layout";
import Nav from "components/nav";
import PostDetail from "@/components/postDetail/index";
import { useSpace } from "utils/hooks";
import { SPACE_ITEMS } from "utils/constants";
import ssrNextApi from "services/nextApi";
import { EmptyQuery } from "utils/constants";

export default function Index({ detail, network, votes,voteStatus }) {
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
      <PostDetail data={detail} network={network} votes={votes} voteStatus={voteStatus} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id, space: spaceName } = context.params;
  const { page } = context.query;

  const nPage = parseInt(page) || 1;

  const { result: detail } = await ssrNextApi.fetch(
    `${spaceName}/proposals/${id}`
  );

  const [
    { result: network },
    { result: votes },
    { result: voteStatus },
  ] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceName}`),
    ssrNextApi.fetch(
      `${spaceName}/proposals/${detail?._id}/votes`,
      { page: nPage }
    ),
    ssrNextApi.fetch(`${spaceName}/proposals/${detail._id}/stats`),
  ]);


  return {
    props: {
      detail: detail ?? null,
      network: network ?? null,
      votes: votes ?? EmptyQuery,
      voteStatus: voteStatus,
    },
  };
}

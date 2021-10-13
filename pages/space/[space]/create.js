import Layout from "components/layout";
import Nav from "components/nav";
import PostCreate from "@/components/postCreate";
import { useSpace } from "utils/hooks";
import { SPACE_ITEMS } from "utils/constants";
import { ssrNextApi } from "services/nextApi";

export default function Create({ network }) {
  const space = useSpace();
  const item = SPACE_ITEMS.find((item) => item.value === space);

  return (
    <Layout bgHeight="183px">
      {item && (
        <Nav
          data={[
            { name: "Space", link: "/" },
            { name: item?.name, link: `/space/${item?.value}`, back: true },
            { name: "New Post" },
          ]}
        />
      )}
      <PostCreate network={network} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { space: spaceName } = context.params;

  const [
    { result: network },
  ] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceName}`),
  ]);

  return {
    props: {
      network: network ?? null,
    },
  };
}

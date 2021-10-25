import Layout from "components/layout";
import Nav from "components/nav";
import PostCreate from "@/components/postCreate";
import { useSpace } from "frontedUtils/hooks";
import { SPACE_ITEMS } from "frontedUtils/constants";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";

export default function Create({ network }) {
  const space = useSpace();
  const item = SPACE_ITEMS.find((item) => item.value === space);

  return (
    <Layout bgHeight="183px" network={network}>
      {item && (
        <Nav
          data={[
            { name: "Home", link: "/" },
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

  if(Object.keys(network).length === 0){
    to404(context);
  }

  return {
    props: {
      network: network ?? null,
    },
  };
}

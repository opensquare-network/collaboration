import Layout from "components/layout";
import Nav from "components/nav";
import PostCreate from "@/components/postCreate";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";

export default function Create({ space }) {
  return (
    <Layout bgHeight="183px" space={space}>
      <Nav
        data={[
          { name: "Home", link: "/" },
          { name: space?.name, link: `/space/${space?.id}`, back: true },
          { name: "New Post" },
        ]}
      />
      <PostCreate space={space} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { space: spaceId } = context.params;

  const [
    { result: space },
  ] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceId}`),
  ]);

  if (!space) {
    to404(context);
  }

  return {
    props: {
      space: space ?? null,
    },
  };
}

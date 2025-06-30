import Layout from "components/layout";
import Breadcrumb from "components/breadcrumb";
import PostCreate from "@/components/postCreate";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";
import { getSpaceNetwork } from "frontedUtils/space";

export default function Create({ space, settings }) {
  return (
    <Layout bgHeight="183px" networks={getSpaceNetwork(space)}>
      <Breadcrumb
        routes={[
          { name: "Home", link: "/" },
          { name: space?.name, link: `/space/${space?.id}` },
          { name: "New Post" },
        ]}
      />
      <PostCreate space={space} settings={settings} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { space: spaceId } = context.params;

  const [{ result: space }, { result: settings }] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceId}`),
    ssrNextApi.fetch(`${spaceId}/proposals/settings`),
  ]);

  if (!space) {
    to404(context);
  }

  return {
    props: {
      space: space ?? null,
      settings: settings ?? {},
    },
  };
}

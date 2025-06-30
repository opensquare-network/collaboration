import Seo from "@/components/seo";
import Layout from "@/components/layout";
import { ssrNextApi } from "services/nextApi";
import SelectSpaceType from "@/components/newSpace/selectSpaceType";

export default function NewSpacePage({ allNetworks }) {
  return (
    <>
      <Seo desc={"desc"} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <SelectSpaceType />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const [{ result: allNetworks }] = await Promise.all([
    ssrNextApi.fetch("networks"),
  ]);

  return {
    props: {
      allNetworks: allNetworks || [],
    },
  };
}

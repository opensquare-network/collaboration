import Seo from "@/components/seo";
import Layout from "@/components/layout";
import { ssrNextApi } from "../../../services/nextApi";
import SelectSpaceType from "@/components/newSpace/selectSpaceType";

export default function NewSpacePage({ allNetworks, chainsDef, tokensDef }) {
  return (
    <>
      <Seo desc={"desc"} />
      <Layout bgHeight="183px" networks={allNetworks}>
        {/*<NewSpace chainsDef={chainsDef} tokensDef={tokensDef} />*/}
        <SelectSpaceType />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const [
    { result: allNetworks },
    { result: chainsDef },
    { result: tokensDef },
  ] = await Promise.all([
    ssrNextApi.fetch("networks"),
    ssrNextApi.fetch("chains/definition"),
    ssrNextApi.fetch("tokens/definition"),
  ]);

  return {
    props: {
      allNetworks: allNetworks || [],
      chainsDef: chainsDef || [],
      tokensDef: tokensDef || [],
    },
  };
}

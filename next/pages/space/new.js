import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "components/layout";
import Seo from "@/components/seo";
import { ssrNextApi } from "services/nextApi";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import NewSpace from "@/components/newSpace";

export default function Index({ allNetworks, chainsDef, tokensDef }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvailableNetworks(allNetworks || []));
  }, [dispatch, allNetworks]);

  const desc = "Create new space";
  return (
    <>
      <Seo desc={desc} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <NewSpace chainsDef={chainsDef} tokensDef={tokensDef} />
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

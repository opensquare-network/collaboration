import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "components/layout";
import Seo from "@/components/seo";
import { ssrNextApi } from "services/nextApi";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import NewSpace from "@/components/newSpace";

export default function Index({ allNetworks, chainsDef }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvailableNetworks(allNetworks || []));
  }, [dispatch, allNetworks]);

  const desc = "Create new space";
  return (
    <>
      <Seo desc={desc} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <NewSpace chainsDef={chainsDef} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const [{ result: allNetworks }, { result: chainsDef }] = await Promise.all([
    ssrNextApi.fetch("networks"),
    ssrNextApi.fetch("chains/definition"),
  ]);

  return {
    props: {
      allNetworks: allNetworks || [],
      chainsDef: chainsDef || [],
    },
  };
}

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "@/components/layout";
import Seo from "@/components/seo";
import { ssrNextApi } from "../../../services/nextApi";
import { setAvailableNetworks } from "../../../store/reducers/accountSlice";
import Index from "@/components/newSpace/newCollectiveSpace";

export default function Collectives({ allNetworks }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvailableNetworks(allNetworks || []));
  }, [dispatch, allNetworks]);

  const desc = "Create new space";
  return (
    <>
      <Seo desc={desc} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <Index />
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

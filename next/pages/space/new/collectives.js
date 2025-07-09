import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "@/components/layout";
import Seo from "@/components/seo";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import Index from "@/components/newSpace/newCollectiveSpace";
import { COLLECTIVE_SPACE_NETWORK } from "frontedUtils/space";
import { ReCaptcha } from "@/components/reCaptcha";

export default function Collectives({ networks }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvailableNetworks(networks || []));
  }, [dispatch, networks]);

  const desc = "Create new space";
  return (
    <>
      <Seo desc={desc} />
      <ReCaptcha />
      <Layout bgHeight="183px" networks={networks}>
        <Index />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      networks: COLLECTIVE_SPACE_NETWORK,
    },
  };
}

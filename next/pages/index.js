import Layout from "components/layout";
import Home from "components/home";
import { ssrNextApi } from "services/nextApi";
import Seo from "@/components/seo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "store/reducers/accountSlice";

export default function Index({
  spaces,
  hottestProposals,
  showAllSpace,
  allNetworks,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvailableNetworks(allNetworks || []));
  }, [dispatch, allNetworks]);

  const desc =
    "One of the governance products powered by OpenSquare. It supports relay chains, para chains and assets on Statemine/Statemint, gas free and voting strategies customizable.";
  return (
    <>
      <Seo desc={desc} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <Home
          spaces={spaces}
          hottestProposals={hottestProposals}
          showAllSpace={showAllSpace}
        />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const [
    { result: spaces },
    { result: hottestProposals },
    { result: allNetworks },
  ] = await Promise.all([
    ssrNextApi.fetch("spaces"),
    ssrNextApi.fetch("home/hottest"),
    ssrNextApi.fetch("networks"),
  ]);

  const showAllSpace = context.req.cookies.showallspace;

  return {
    props: {
      spaces: spaces || {},
      hottestProposals: hottestProposals || [],
      showAllSpace: showAllSpace ?? "1",
      allNetworks: allNetworks || [],
    },
  };
}

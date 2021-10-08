import Layout from "components/layout";
import Home from "components/home";
import { ssrNextApi } from "services/nextApi";

export default function Index({ spaces, hotestProposals }) {
  return (
    <Layout bgHeight="183px">
      <Home spaces={spaces} hotestProposals={hotestProposals} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { result: spaces } = await ssrNextApi.fetch("spaces");
  const { result: hotestProposals } = await ssrNextApi.fetch("home/hotest");
  return {
    props: {
      spaces: spaces || {},
      hotestProposals: hotestProposals || [],
    },
  };
}

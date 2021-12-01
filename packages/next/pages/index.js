import Layout from "components/layout";
import Home from "components/home";
import { ssrNextApi } from "services/nextApi";

export default function Index({ spaces, hottestProposals }) {
  return (
    <Layout bgHeight="183px">
      <Home spaces={spaces} hottestProposals={hottestProposals} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const [{ result: spaces }, { result: hottestProposals }] = await Promise.all([
    ssrNextApi.fetch("spaces"),
    ssrNextApi.fetch("home/hottest"),
  ]);

  return {
    props: {
      spaces: spaces || {},
      hottestProposals: hottestProposals || [],
    },
  };
}

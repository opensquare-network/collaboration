import { useQuery } from "react-query";

import Layout from "components/layout";
import Home from "components/home";
import api from "services/reactApi";

export default function Index() {
  const { data: spaces } = useQuery("spaces", async () => {
    const { result } = await api.fetch("/spaces");
    return result;
  });

  const { data: hottest } = useQuery("hottest", async () => {
    const { result } = await api.fetch("/home/hottest");
    return result;
  });

  return (
    <Layout>
      <Home spaces={spaces} hottestProposals={hottest} />
    </Layout>
  );
}

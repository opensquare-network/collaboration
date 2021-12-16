import Layout from "components/layout";
import Home from "components/home";
import { ssrNextApi } from "services/nextApi";
import { NextSeo } from "next-seo";

export default function Index({spaces, hottestProposals}) {
  return (
    <>
      <NextSeo
        title="OpenSquare Network | Off-chain Voting"
        description="A OpenSquare Network platform"
        openGraph={{
          url: 'https://www.opensquare.io/',
          title: 'OpenSquare Network | Off-chain Voting',
          description: 'A OpenSquare Network platform',
          images: [
            { url: 'https://test.opensquare.io/logo.png' },
          ],
          site_name: 'OpenSquare Network | Off-chain Voting',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary',
        }}
      />
      <Layout bgHeight="183px">
        <Home spaces={spaces} hottestProposals={hottestProposals}/>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const [{result: spaces}, {result: hottestProposals}] = await Promise.all([
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

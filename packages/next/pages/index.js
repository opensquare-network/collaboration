import Layout from "components/layout";
import Home from "components/home";
import { ssrNextApi } from "services/nextApi";
import { NextSeo } from "next-seo";

export default function Index({ spaces, hottestProposals, showAllSpace }) {
  const desc = `One of the governance products powered by OpenSquare. It supports relay chains, para chains and assets on Statemine/Statemint, gas free and voting strategies customizable.`;
  return (
    <>
      <NextSeo
        title="OpenSquare Off-chain Voting"
        description={desc}
        openGraph={{
          url: "https://www.opensquare.io/",
          title: "OpenSquare Off-chain Voting",
          description: desc,
          images: [
            {
              url: "https://test.opensquare.io/imgs/logo.jpg",
              width: 1200,
              height: 628,
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Layout bgHeight="183px">
        <Home spaces={spaces} hottestProposals={hottestProposals} showAllSpace={showAllSpace} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const [{ result: spaces }, { result: hottestProposals }] = await Promise.all([
    ssrNextApi.fetch("spaces"),
    ssrNextApi.fetch("home/hottest"),
  ]);

  const showAllSpace = context.req.cookies.showallspace;

  return {
    props: {
      spaces: spaces || {},
      hottestProposals: hottestProposals || [],
      showAllSpace: showAllSpace ?? "1",
    },
  };
}

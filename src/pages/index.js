import Head from "next/head";

import Layout from "components/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Opensquare - voting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </>
  );
}

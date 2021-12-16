import Layout from "components/layout";
import Nav from "components/nav";
import PostDetail from "@/components/postDetail/index";
import { useEncodedAddress, useSpace } from "frontedUtils/hooks";
import { SPACE_ITEMS } from "frontedUtils/constants";
import { ssrNextApi } from "services/nextApi";
import nextApi from "services/nextApi";
import { EmptyQuery } from "frontedUtils/constants";
import { encodeAddress } from "@polkadot/util-crypto";
import { useState, useEffect } from "react";
import FourOFour from "../../../404";
import { NextSeo } from "next-seo";
import { addressEllipsis } from "../../../../frontedUtils";

export default function Index({
  detail,
  network,
  votes,
  voteStatus,
  comments,
  defaultPage,
  myVote,
}) {
  const space = useSpace();
  const item = SPACE_ITEMS.find((item) => item.value === space);
  const [savedMyVote, setSavedMyVote] = useState(myVote);
  const encodedAddress = useEncodedAddress(network);

  useEffect(() => {
    if (encodedAddress) {
      nextApi
        .fetch(`${space}/proposal/${detail?._id}/votes/${encodedAddress}`)
        .then((result) => {
          if (result?.result) {
            setSavedMyVote(result.result);
          } else {
            setSavedMyVote(null);
          }
        })
        .catch(() => {
          setSavedMyVote(null);
        });
    } else {
      // logout
      setSavedMyVote(null);
    }
  }, [encodedAddress, detail?._id, space, myVote]);

  if (!detail) {
    return <FourOFour />;
  }

  const getMetaDesc = (post) => {
    let contentDesc = "";
    const maxDescLength = 180;
    if (post.content) {
      if (post.content.length > maxDescLength) {
        contentDesc = post.content.substr(0, maxDescLength) + "...";
      } else {
        contentDesc = post.content;
      }
    }
    return contentDesc;
  };

  const desc = getMetaDesc(detail, "Proposal");

  const images = [{
    url: `https://test.opensquare.io/imgs/${item?.name}-logo.jpg`,
    width: 1200,
    height: 628
  }];

  return (
    <>
      <NextSeo
        title={detail?.title ?? `OpenSquare Off-chain Voting`}
        description={desc}
        openGraph={{
          url: 'https://www.opensquare.io/',
          title: detail?.title ?? `OpenSquare Off-chain Voting`,
          description: desc,
          images,
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Layout bgHeight="183px" network={network}>
        {item && (
          <Nav
            data={[
              { name: "Home", link: "/" },
              { name: item?.name, link: `/space/${item?.value}`, back: true },
              { name: "Proposal" },
            ]}
          />
        )}
        <PostDetail
          data={detail}
          network={network}
          votes={votes}
          voteStatus={voteStatus}
          comments={comments}
          defaultPage={defaultPage}
          myVote={savedMyVote}
        />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id, space: spaceName } = context.params;
  const { page, tab } = context.query;

  const nPage = page === "last" ? "last" : parseInt(page) || 1;
  const activeTab = tab ?? "votes";
  const pageSize = 5;

  const { result: detail } = await ssrNextApi.fetch(
    `${spaceName}/proposal/${id}`
  );

  if (!detail) {
    return { props: {} };
  }

  const [
    { result: network },
    { result: votes },
    { result: voteStatus },
    { result: comments },
  ] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceName}`),
    ssrNextApi.fetch(`${spaceName}/proposal/${detail?.cid}/votes`, {
      page: activeTab === "votes" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceName}/proposal/${detail?.cid}/stats`),
    ssrNextApi.fetch(`${spaceName}/proposal/${detail?.cid}/comments`, {
      page: activeTab === "discussion" ? nPage : 1,
      pageSize,
    }),
  ]);

  const address = context.req.cookies.address;
  let myVote;
  if (address) {
    const encodedAddress = encodeAddress(address, network.ss58Format);
    const result = await ssrNextApi.fetch(
      `${spaceName}/proposal/${detail?._id}/votes/${encodedAddress}`
    );
    myVote = result.result ?? null;
  }

  return {
    props: {
      detail: detail ?? null,
      network: network ?? null,
      votes: votes ?? EmptyQuery,
      voteStatus: voteStatus ?? [],
      comments: comments ?? EmptyQuery,
      defaultPage: { tab: activeTab ?? null, page: nPage },
      myVote: myVote ?? null,
    },
  };
}

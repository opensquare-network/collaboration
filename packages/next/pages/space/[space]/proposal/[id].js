import Layout from "components/layout";
import { useDispatch } from "react-redux";
import Nav from "components/nav";
import PostDetail from "@/components/postDetail/index";
import { useEncodedAddress } from "frontedUtils/hooks";
import { ssrNextApi } from "services/nextApi";
import nextApi from "services/nextApi";
import { EmptyQuery } from "frontedUtils/constants";
import { encodeAddress } from "@polkadot/util-crypto";
import { useState, useEffect } from "react";
import FourOFour from "../../../404";
import { NextSeo } from "next-seo";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import pick from "lodash/pick";

export default function Index({
  detail,
  space,
  votes,
  voteStatus,
  comments,
  defaultPage,
  myVote,
}) {
  const dispatch = useDispatch();
  const [savedMyVote, setSavedMyVote] = useState(myVote);
  const encodedAddress = useEncodedAddress(space);

  useEffect(() => {
    dispatch(setAvailableNetworks(
      detail?.networksConfig?.networks?.map(
        item => pick(item, ["network", "ss58Format"])
      ) || []
    ));
  }, [detail]);

  useEffect(() => {
    if (encodedAddress) {
      nextApi
        .fetch(`${space.id}/proposal/${detail?.cid}/votes/${encodedAddress}`)
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
  }, [encodedAddress, detail?.cid, space, myVote]);

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
    url: `https://test.opensquare.io/imgs/${space?.id}-logo.jpg`,
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
      <Layout bgHeight="183px" space={space}>
        <Nav
          data={[
            { name: "Home", link: "/" },
            { name: space?.name, link: `/space/${space?.id}`, back: true },
            { name: "Proposal" },
          ]}
        />
        <PostDetail
          data={detail}
          space={space}
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
  const { id, space: spaceId } = context.params;
  const { page, tab } = context.query;

  const nPage = page === "last" ? "last" : parseInt(page) || 1;
  const activeTab = tab ?? "votes";
  const pageSize = 50;

  const { result: detail } = await ssrNextApi.fetch(
    `${spaceId}/proposal/${id}`
  );

  if (!detail) {
    return { props: {} };
  }

  const [
    { result: space },
    { result: votes },
    { result: voteStatus },
    { result: comments },
  ] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceId}`),
    ssrNextApi.fetch(`${spaceId}/proposal/${detail?.cid}/votes`, {
      page: activeTab === "votes" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceId}/proposal/${detail?.cid}/stats`),
    ssrNextApi.fetch(`${spaceId}/proposal/${detail?.cid}/comments`, {
      page: activeTab === "discussion" ? nPage : 1,
      pageSize,
    }),
  ]);

  const address = context.req.cookies.address;
  let myVote;
  if (address) {
    const encodedAddress = encodeAddress(address, space.ss58Format);
    const result = await ssrNextApi.fetch(
      `${spaceId}/proposal/${detail?.cid}/votes/${encodedAddress}`
    );
    myVote = result.result ?? null;
  }

  return {
    props: {
      detail: detail ?? null,
      space: space ?? null,
      votes: votes ?? EmptyQuery,
      voteStatus: voteStatus ?? [],
      comments: comments ?? EmptyQuery,
      defaultPage: { tab: activeTab ?? null, page: nPage },
      myVote: myVote ?? null,
    },
  };
}

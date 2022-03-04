import Layout from "components/layout";
import { useDispatch, useSelector } from "react-redux";
import Nav from "components/nav";
import PostDetail from "@/components/postDetail/index";
import nextApi, { ssrNextApi } from "services/nextApi";
import { EmptyQuery } from "frontedUtils/constants";
import { encodeAddress } from "@polkadot/util-crypto";
import { useEffect, useState } from "react";
import FourOFour from "../../../404";
import {
  loginAddressSelector,
  setAvailableNetworks,
} from "store/reducers/accountSlice";
import pick from "lodash.pick";
import { setSpaceConfig } from "../../../../store/reducers/spaceConfigSlice";
import { spaceToSeoImageMap } from "../../../../frontedUtils/consts/spaces";
import Seo from "@/components/seo";

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
  dispatch(setSpaceConfig(space));

  const [savedMyVote, setSavedMyVote] = useState(myVote);
  const loginAddress = useSelector(loginAddressSelector);

  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        detail?.networksConfig?.networks?.map((item) =>
          pick(item, ["network", "ss58Format"])
        ) || []
      )
    );
  }, [dispatch, detail]);

  useEffect(() => {
    if (loginAddress) {
      nextApi
        .fetch(`${space.id}/proposal/${detail?.cid}/votes/${loginAddress}`)
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
  }, [loginAddress, detail?.cid, space, myVote]);

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

  const seoLogoHash = spaceToSeoImageMap[space?.id];
  if (!seoLogoHash) {
    throw new Error(`No seo logo hash found for space ${space?.id}`);
  }

  return (
    <>
      <Seo spaceId={space?.id} title={detail?.title} desc={desc} />
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

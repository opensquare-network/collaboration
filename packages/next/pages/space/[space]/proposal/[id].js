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
  initAccount,
  loginAddressSelector,
  setAvailableNetworks,
} from "store/reducers/accountSlice";
import pick from "lodash.pick";
import {
  defaultSeoImage,
  spaceToSeoImageMap,
} from "../../../../frontedUtils/consts/spaces";
import Seo from "@/components/seo";
import { useIsMounted } from "../../../../frontedUtils/hooks";

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
  const isMounted = useIsMounted();

  useEffect(() => {
    dispatch(initAccount());
  }, [dispatch]);

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
          if (!isMounted) {
            return;
          }

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
  }, [loginAddress, detail?.cid, space, myVote, isMounted]);

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

  const seoLogoHash = spaceToSeoImageMap[space?.id] || defaultSeoImage;
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
  const { page, discussion_page: discussionPage } = context.query;

  const nPage = page === "last" ? "last" : parseInt(page) || 1;
  const discusPage =
    discussionPage === "last" ? "last" : parseInt(discussionPage) || 1;

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
      page: nPage,
      pageSize: 50,
    }),
    ssrNextApi.fetch(`${spaceId}/proposal/${detail?.cid}/stats`),
    ssrNextApi.fetch(`${spaceId}/proposal/${detail?.cid}/comments`, {
      page: discusPage,
      pageSize: 25,
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
      defaultPage: { page: nPage, discussionPage: discusPage },
      myVote: myVote ?? null,
    },
  };
}

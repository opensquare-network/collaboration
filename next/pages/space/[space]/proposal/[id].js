import Layout from "components/layout";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "components/breadcrumb";
import PostDetail from "@/components/postDetail/index";
import nextApi, { ssrNextApi } from "services/nextApi";
import { EmptyQuery } from "frontedUtils/constants";
import { useEffect, useState } from "react";
import FourOFour from "../../../404";
import {
  loginAddressSelector,
  setAvailableNetworks,
} from "store/reducers/accountSlice";
import pick from "lodash.pick";
import Seo from "@/components/seo";
import { useIsMounted } from "../../../../frontedUtils/hooks";
import encodeAddressByChain from "../../../../frontedUtils/chain/addr";

export default function Index({
  detail,
  space,
  votes,
  voteStatus,
  comments,
  defaultPage,
  myVote,
  isSafari,
}) {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();

  const [savedMyVote, setSavedMyVote] = useState(myVote);
  const loginAddress = useSelector(loginAddressSelector);

  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        detail?.networksConfig?.networks?.map((item) =>
          pick(item, ["network", "ss58Format"]),
        ) || [],
      ),
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

  return (
    <>
      <Seo
        space={space}
        title={detail?.title}
        desc={desc}
        banner={
          detail?.banner &&
          `${process.env.NEXT_PUBLIC_API_END_POINT}api/ipfs/files/${detail?.banner}`
        }
      />
      <Layout bgHeight="183px" networks={space.networks}>
        <Breadcrumb
          routes={[
            { name: "Home", link: "/" },
            { name: space?.name, link: `/space/${space?.id}` },
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
          isSafari={isSafari}
        />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const userAgent = context?.req?.headers["user-agent"] ?? "";
  const isSafari =
    userAgent.includes("Safari") && !userAgent.includes("Chrome");

  const { id, space: spaceId } = context.params;
  const { page, discussion_page: discussionPage } = context.query;

  const nPage = page === "last" ? "last" : parseInt(page) || 1;
  const discusPage =
    discussionPage === "last" ? "last" : parseInt(discussionPage) || 1;

  const { result: detail } = await ssrNextApi.fetch(
    `${spaceId}/proposal/${id}`,
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

  const cookieValue = context.req.cookies.addressV3;
  let myVote;
  if (cookieValue) {
    const [network, address] = cookieValue.split("/");
    const encodedAddress = encodeAddressByChain(address, network);
    const result = await ssrNextApi.fetch(
      `${spaceId}/proposal/${detail?.cid}/votes/network/${network}/address/${encodedAddress}`,
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
      isSafari,
    },
  };
}

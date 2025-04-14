import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Author from "components/author";
import Pagination from "components/pagination";
import { useViewfunc } from "frontedUtils/hooks";
import { loginAccountSelector } from "store/reducers/accountSlice";
import {
  newErrorToast,
  newPendingToast,
  newSuccessToast,
  newToastId,
  removeToast,
} from "store/reducers/toastSlice";
import { findNetworkConfig } from "services/util";
import HeaderWithNumber from "@/components/postDetail/numberHeader";
import encodeAddressByChain from "../../frontedUtils/chain/addr";
import AccordionPanel from "@/components/accordionPanel/panel";
import nextApi from "../../services/nextApi";
import { extensionCancelled } from "../../frontedUtils/consts/extension";
import NoData from "@osn/common-ui/es/NoData";
import {
  MarkdownPreviewer,
  renderMentionIdentityUserPlugin,
} from "@osn/previewer";
import { IpfsSquare, MentionIdentityUser } from "@osn/common-ui";
import { useSuggestions } from "./suggestions";
import Editor from "../editor";
import { signCommentWith } from "frontedUtils/signData";
import useSignApiData from "hooks/useSignApiData";
import TimeDuration from "../duration";

const Item = styled.div`
  padding-top: 20px;
`;

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
  color: var(--textTertiary);
  > :not(:first-child) {
    ::before {
      content: "·";
      font-size: 14px;
      line-height: 24px;
      margin: 0 8px;
    }
  }
`;

const ContentWrapper = styled.div`
  margin: 8px 0 0 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--strokeBorderDefault);
`;

const Content = styled.div`
  line-height: 24px;
`;

const PaginationWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NoCommentWrapper = styled.div`
  height: 104px;
  border-bottom: 1px solid var(--strokeBorderDefault);

  > div {
    border: none;
    box-shadow: none;
    height: 100%;
  }
`;

export default function PostDiscussion({
  proposal,
  space,
  comments,
  votesPage = 1,
}) {
  const [content, setContent] = useState("");
  const viewfunc = useViewfunc();
  const account = useSelector(loginAccountSelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const signApiData = useSignApiData();

  const onSubmit = async (callback) => {
    if (isLoading) return;
    if (!viewfunc) {
      return;
    }
    if (!account) {
      dispatch(newErrorToast("Please connect wallet"));
      return;
    }
    if (!content) {
      dispatch(newErrorToast("Content is missing"));
      return;
    }
    setIsLoading(true);
    let signedData;
    try {
      signedData = await signCommentWith(signApiData, {
        proposalCid: proposal?.cid,
        content,
        contentType: "markdown",
        address: encodeAddressByChain(account?.address, account?.network),
        commenterNetwork: account?.network,
      });
    } catch (e) {
      const errorMessage = e.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      setIsLoading(false);
      return;
    }

    const toastId = newToastId();
    dispatch(
      newPendingToast(toastId, "Saving and uploading comment to IPFS..."),
    );
    let result;
    try {
      result = await nextApi.post(`${space.id}/comments`, signedData);
    } finally {
      dispatch(removeToast(toastId));
      setIsLoading(false);
    }

    if (result?.error) {
      dispatch(newErrorToast(result.error.message));
    } else if (result) {
      setContent("");
      if (callback) callback();
      router.replace({
        query: {
          ...router.query,
          page: "last",
        },
      });
      dispatch(newSuccessToast("Comment submitted!"));
    }
  };

  const getNetwork = (comment) =>
    findNetworkConfig(proposal.networksConfig, comment.commenterNetwork);
  const spaceSupportMultiChain = space?.networks?.length > 1;

  const { loadSuggestions } = useSuggestions(comments);

  return (
    <AccordionPanel
      head={<HeaderWithNumber title="Discussions" number={comments?.total} />}
    >
      {(comments?.items || []).map((item, index) => (
        <Item key={index}>
          <InfoWrapper>
            <DividerWrapper>
              <Author
                address={item.address}
                space={getNetwork(item)}
                size={20}
                showNetwork={spaceSupportMultiChain}
              />
              <div>
                <TimeDuration time={item.createdAt} />
              </div>
            </DividerWrapper>
            <IpfsSquare
              href={
                item?.pinHash &&
                `${process.env.NEXT_PUBLIC_API_END_POINT}api/ipfs/files/${item.pinHash}`
              }
            />
          </InfoWrapper>
          <ContentWrapper>
            <Content>
              <MarkdownPreviewer
                content={item.content}
                plugins={[
                  renderMentionIdentityUserPlugin(
                    <MentionIdentityUser explore />,
                  ),
                ]}
              />
            </Content>
          </ContentWrapper>
        </Item>
      ))}
      {!comments?.items?.length > 0 && (
        <NoCommentWrapper>
          <NoData message="No current comments" />
        </NoCommentWrapper>
      )}
      <PaginationWrapper>
        <Pagination
          page={comments?.page}
          total={comments?.total}
          pageSize={comments?.pageSize}
          pageKey="discussion_page"
          otherQueries={{
            page: votesPage,
          }}
        />
      </PaginationWrapper>

      <Editor
        submitting={isLoading}
        content={content}
        setContent={setContent}
        onSubmit={onSubmit}
        loadSuggestions={loadSuggestions}
        identifier={<MentionIdentityUser explore />}
      />
    </AccordionPanel>
  );
}

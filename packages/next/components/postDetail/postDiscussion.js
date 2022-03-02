import styled, { css } from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Author from "components/author";
import Pagination from "components/pagination";
import RichInput from "components/richInput";
import { useViewfunc } from "frontedUtils/hooks";
import { loginAccountSelector } from "store/reducers/accountSlice";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "frontedUtils/constants";
import { timeDuration } from "frontedUtils";
import MicromarkMd from "components/micromarkMd";
import ExternalLink from "components/externalLink";
import { encodeAddress } from "@polkadot/util-crypto";
import { findNetworkConfig } from "services/util";
import { spaceSupportMultiChainSelector } from "../../store/reducers/spaceConfigSlice";

const Item = styled.div`
  padding-top: 20px;
`;

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
  color: #a1a8b3;
  > :not(:first-child) {
    ::before {
      content: "·";
      font-size: 14px;
      line-height: 24px;
      color: #e3e7ed;
      margin: 0 8px;
    }
  }
`;

const ContentWrapper = styled.div`
  margin: 8px 0 0 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f3f8;
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

const RichInputWrapper = styled.div`
  margin-top: 20px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Square = styled.div`
  width: 20px;
  height: 20px;
  background: url("/imgs/icons/ipfs.svg");
  ${(p) =>
    !p.noHover &&
    css`
      cursor: pointer;
      :hover {
        background: url("/imgs/icons/ipfs-active.svg");
      }
    `}
`;

const NoCommentWrapper = styled.div`
  display: flex;
  height: 104px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
  border-bottom: 1px solid #f0f3f8;
`;

export default function PostDiscussion({ proposal, space, comments }) {
  const [content, setContent] = useState("");
  const viewfunc = useViewfunc();
  const account = useSelector(loginAccountSelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (callback) => {
    if (isLoading) return;
    if (!viewfunc) {
      return;
    }
    if (!account) {
      dispatch(
        addToast({
          type: TOAST_TYPES.ERROR,
          message: "Please connect wallet",
        })
      );
      return;
    }
    if (!content) {
      dispatch(
        addToast({
          type: TOAST_TYPES.ERROR,
          message: "Content is missing",
        })
      );
      return;
    }
    setIsLoading(true);
    let result;
    try {
      result = await viewfunc.addComment(
        space.id,
        proposal?.cid,
        content,
        "markdown",
        encodeAddress(account?.address, account?.ss58Format),
        account?.network
      );
    } catch (error) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: error.toString() })
      );
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    if (result?.error) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: result.error.message })
      );
    } else if (result) {
      setContent("");
      if (callback) callback();
      router.replace({
        query: {
          ...router.query,
          page: "last",
        },
      });
      dispatch(
        addToast({
          type: TOAST_TYPES.SUCCESS,
          message: "Comment submitted!",
        })
      );
    }
  };

  const getNetwork = (comment) =>
    findNetworkConfig(proposal.networksConfig, comment.commenterNetwork);
  const spaceSupportMultiChain = useSelector(spaceSupportMultiChainSelector);
  return (
    <div>
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
              <div>{timeDuration(item.createdAt)}</div>
            </DividerWrapper>
            {item?.pinHash ? (
              <ExternalLink
                href={`https://ipfs-hk.decoo.io/ipfs/${item.pinHash}`}
              >
                <Square />
              </ExternalLink>
            ) : (
              <Square noHover={true} />
            )}
          </InfoWrapper>
          <ContentWrapper>
            <Content>
              <MicromarkMd md={item.content} />
            </Content>
          </ContentWrapper>
        </Item>
      ))}
      {!comments?.items?.length > 0 && (
        <NoCommentWrapper>No current comments</NoCommentWrapper>
      )}
      <PaginationWrapper>
        <Pagination
          page={comments?.page}
          total={comments?.total}
          pageSize={comments?.pageSize}
        />
      </PaginationWrapper>
      <RichInputWrapper>
        <RichInput
          content={content}
          setContent={setContent}
          onSubmit={onSubmit}
        />
      </RichInputWrapper>
    </div>
  );
}

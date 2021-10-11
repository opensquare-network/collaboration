import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Author from "components/author";
import { DISCUSSION_ITEMS } from "utils/constants";
import Pagination from "components/pagination";
import RichInput from "components/richInput";
import { useViewfunc, useSpace } from "utils/hooks";
import { accountSelector } from "store/reducers/accountSlice";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "utils/constants";

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

export default function PostDiscussion({ data }) {
  const [content, setContent] = useState("");
  const viewfunc = useViewfunc();
  const space = useSpace();
  const account = useSelector(accountSelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  console.log({ data, account });

  const onSubmit = async () => {
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
    setIsLoading(true);
    let result;
    try {
      result = await viewfunc.addComment(
        space,
        data?.cid,
        content,
        "markdown",
        account?.address
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
      dispatch(
        addToast({
          type: TOAST_TYPES.SUCCESS,
          message: "Add comment successfully!",
        })
      );
    }
  };

  return (
    <div>
      {DISCUSSION_ITEMS.map((item, index) => (
        <Item key={index}>
          <DividerWrapper>
            <Author username={item.author} />
            <div>{item.time}</div>
          </DividerWrapper>
          <ContentWrapper>
            <Content>{item.content}</Content>
          </ContentWrapper>
        </Item>
      ))}
      <PaginationWrapper>
        <Pagination />
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

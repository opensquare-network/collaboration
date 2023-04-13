import styled, { css } from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as AddIcon } from "/public/imgs/icons/add-appendant.svg";
import { useRouter } from "next/router";
import {
  DividerWrapper,
  Time,
  FlexBetween,
  FlexCenter,
  IpfsSquare,
  RichEditor,
} from "@osn/common-ui";
import {
  newErrorToast,
  newPendingToast,
  newToastId,
  removeToast,
} from "store/reducers/toastSlice";
import { loginAccountSelector } from "store/reducers/accountSlice";
import {
  p_14_normal,
  p_16_semibold,
} from "@osn/common-ui/es/styles/textStyles";
import { text_dark_accessory } from "@osn/common-ui/es/styles/colors";
import { useViewfunc } from "frontedUtils/hooks";
import nextApi from "services/nextApi";
import { MarkdownPreviewer } from "@osn/previewer";

const Wrapper = styled.div`
  > :first-child {
    ${p_16_semibold};
  }
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const ItemWrapper = styled.div`
  > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledDividerWrapper = styled(DividerWrapper)`
  ${p_14_normal};
  > :first-child {
    font-weight: 500;
  }
  > :nth-child(2) {
    color: #a1a8b3;
  }
`;

const AddButton = styled(FlexCenter)`
  cursor: pointer;

  ${(p) =>
    p.editing &&
    css`
      svg {
        path {
          fill: ${text_dark_accessory};
        }
      }
    `}
`;

const EditorWrapper = styled.div``;

const Count = styled.div`
  color: #a1a8b3;
`;

const MarkdownPreviewWrapper = styled.div`
  margin-top: 4px;
`;

export default function Appendants({ proposal, appendants, editable }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const account = useSelector(loginAccountSelector);

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const viewfunc = useViewfunc();

  const contentType = "markdown";

  const showErrorToast = (message) => dispatch(newErrorToast(message));

  const onSubmit = async () => {
    if (!viewfunc) {
      return;
    }

    if (!account) {
      return showErrorToast("Please connect wallet");
    }

    if (!content) {
      return showErrorToast("Content is empty");
    }

    let signedData;
    setLoading(true);
    try {
      signedData = await viewfunc.signAppendant(
        proposal?.space,
        proposal?.cid,
        content,
        contentType,
        account.address,
        account.network,
      );
    } catch (error) {
      const errorMessage = error.message;
      if ("Cancelled" === errorMessage) {
        setLoading(false);
      } else {
        dispatch(newErrorToast(errorMessage));
      }
      return;
    }

    const toastId = newToastId();
    dispatch(
      newPendingToast(toastId, "Saving and uploading the appendant to IPFS..."),
    );
    let result;
    try {
      result = await nextApi.post(`${proposal?.space}/appendants`, signedData);
    } finally {
      dispatch(removeToast(toastId));
      setLoading(false);
    }

    if (result?.error) {
      dispatch(newErrorToast(result.error.message));
    } else if (result) {
      setContent("");
      setEditing(false);
      router.replace(router.asPath);
    }
  };

  const appendantsCount = appendants?.length || 0;
  if (!editable && !appendantsCount) {
    return null;
  }

  return (
    <Wrapper>
      <FlexBetween>
        <DividerWrapper>
          <span>Appendants</span>
          <Count>{appendantsCount}</Count>
        </DividerWrapper>
        {editable && (
          <AddButton editing={editing} onClick={() => setEditing(!editing)}>
            <AddIcon />
          </AddButton>
        )}
      </FlexBetween>
      {appendants?.map((item, index) => (
        <ItemWrapper key={index}>
          <div>
            <StyledDividerWrapper>
              <div>{`#${index + 1}`}</div>
              <Time time={item.createdAt} />
            </StyledDividerWrapper>
            <IpfsSquare
              href={
                item.pinHash
                  ? `${process.env.NEXT_PUBLIC_API_END_POINT}api/ipfs/files/${item.pinHash}`
                  : null
              }
            />
          </div>

          <MarkdownPreviewWrapper>
            <MarkdownPreviewer content={item.content} />
          </MarkdownPreviewWrapper>
        </ItemWrapper>
      ))}
      {editing && (
        <EditorWrapper>
          <RichEditor
            content={content}
            setContent={setContent}
            onSubmit={onSubmit}
            showButtons={true}
            submitting={loading}
          />
        </EditorWrapper>
      )}
    </Wrapper>
  );
}

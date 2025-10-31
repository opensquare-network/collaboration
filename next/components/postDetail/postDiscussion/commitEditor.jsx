import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loginAccountSelector } from "store/reducers/accountSlice";
import {
  newErrorToast,
  newPendingToast,
  newSuccessToast,
  newToastId,
  removeToast,
} from "store/reducers/toastSlice";
import encodeAddressByChain from "frontedUtils/chain/addr";
import nextApi from "services/nextApi";
import { extensionCancelled } from "frontedUtils/consts/extension";
import { MentionIdentityUser } from "@osn/common-ui";
import Editor from "@/components/editor";
import { signCommentWith } from "frontedUtils/signData";
import useSignApiData from "hooks/useSignApiData";

export default function CommitEditor({ proposal, space, loadSuggestions }) {
  const [content, setContent] = useState("");
  const account = useSelector(loginAccountSelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const signApiData = useSignApiData();

  const onSubmit = async (callback) => {
    if (isLoading) return;
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

  return (
    <Editor
      submitting={isLoading}
      content={content}
      setContent={setContent}
      onSubmit={onSubmit}
      loadSuggestions={loadSuggestions}
      identifier={<MentionIdentityUser explore />}
    />
  );
}

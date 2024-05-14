/* eslint-disable react/no-unescaped-entities */
import { SystemNewPost } from "@osn/icons/opensquare";
import { useCallback, useEffect, useState } from "react";
import { Input, RichEditor } from "@osn/common-ui";
import { InnerWrapper, Title } from "../postCreate/content";
import Save from "./save";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAccountSelector,
  setAvailableNetworks,
} from "../../store/reducers/accountSlice";
import pick from "lodash.pick";
import {
  clearToasts,
  newErrorToast,
  newPendingToast,
  newSuccessToast,
  newToastId,
  removeToast,
} from "../../store/reducers/toastSlice";
import encodeAddressByChain from "../../frontedUtils/chain/addr";
import { extensionCancelled } from "../../frontedUtils/consts/extension";
import nextApi from "../../services/nextApi";
import { useRouter } from "next/router";

export default function PostSettings({ space, settings }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const account = useSelector(loginAccountSelector);
  const { proposalTemplate } = settings;
  const [title, setTitle] = useState(proposalTemplate?.title);
  const [content, setContent] = useState(proposalTemplate?.content);
  const [contentType] = useState(proposalTemplate?.contentType);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        space?.networks?.map((item) => pick(item, ["network", "ss58Format"])) ||
          [],
      ),
    );
  }, [dispatch, space]);

  const disabled = !title || !content;

  const onSave = useCallback(async () => {
    const address = account?.address ?? "";
    if (!address) {
      dispatch(newErrorToast("Please connect wallet"));
      return;
    }

    const viewFunc = await import("frontedUtils/viewfunc");

    const settings = {
      space: space.id,
      proposalTemplate: {
        title,
        content,
        contentType,
      },
      address: encodeAddressByChain(address, account?.network),
    };

    const formError = viewFunc.validateProposalSettings(settings);
    if (formError) {
      dispatch(newErrorToast(formError));
      return;
    }

    setIsLoading(true);
    let signedData;
    try {
      signedData = await viewFunc.signProposalSettings(settings);
    } catch (e) {
      const errorMessage = e.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      return;
    } finally {
      setIsLoading(false);
    }

    const toastId = newToastId();
    dispatch(newPendingToast(toastId, "Saving settings to IPFS..."));
    setIsLoading(true);
    try {
      const { result, error } = await nextApi.post(
        `${space.id}/proposals/settings`,
        signedData,
      );
      if (result) {
        dispatch(removeToast(toastId));
        dispatch(newSuccessToast("Settings saved successfully!"));
        router
          .push(`/space/${space.id}`)
          .then((redirected) => redirected && dispatch(clearToasts()));
      }
      if (error) {
        dispatch(removeToast(toastId));
        dispatch(newErrorToast(error.message));
      }
    } finally {
      dispatch(removeToast(toastId));
      setIsLoading(false);
    }
  }, [dispatch, account, title, content, contentType, space, router]);

  return (
    <div className="flex mt-[20px] gap-[20px]">
      <div>
        <div className="w-[300px] py-[20px] bg-fillBgPrimary border border-strokeBorderDefault shadow-shadowCardDefault">
          <div className="flex gap-[8px] py-[12px] px-[16px] bg-fillBgTertiary">
            <SystemNewPost className="[&_path]:fill-textTertiary" />
            <span className="text16Semibold text-textPrimary">
              Proposal Template
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col grow p-[32px] gap-[32px] border border-strokeBorderDefault bg-fillBgPrimary shadow-shadowCardDefault">
        <div className="flex flex-col gap-[20px]">
          <InnerWrapper>
            <Title>Why Proposal Template</Title>
            <div className="flex flex-col text-textTertiary text14Medium leading-[20px]">
              <div className="flex">
                <span className="text-[20px] mx-[6px]">·</span>
                <span>
                  With proposal templates, we can standardize the way proposals
                  look and feel, helping users to publish high-quality content
                  that accurately and professionally represent their proposal.
                </span>
              </div>
              <div className="flex">
                <span className="text-[20px] mx-[6px]">·</span>
                <span>
                  Set the space's proposal templates that will be displayed as
                  prefilled content.
                </span>
              </div>
            </div>
          </InnerWrapper>
          <InnerWrapper>
            <Title>Title</Title>
            <Input
              placeholder="Please text here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InnerWrapper>
          <InnerWrapper>
            <Title>Content</Title>
            <RichEditor
              content={content}
              setContent={setContent}
              showButtons={false}
            />
          </InnerWrapper>
        </div>
        <div className="flex flex-start">
          <Save disabled={disabled} loading={isLoading} onSave={onSave} />
        </div>
      </div>
    </div>
  );
}

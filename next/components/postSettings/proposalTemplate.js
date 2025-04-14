/* eslint-disable react/no-unescaped-entities */
import { useCallback, useState } from "react";
import { Input, cn } from "@osn/common-ui";
import { InnerWrapper, Title } from "../postCreate/content";
import Save from "./save";
import { useDispatch, useSelector } from "react-redux";
import { loginAccountSelector } from "../../store/reducers/accountSlice";
import {
  newErrorToast,
  newSuccessToast,
} from "../../store/reducers/toastSlice";
import encodeAddressByChain from "../../frontedUtils/chain/addr";
import { extensionCancelled } from "../../frontedUtils/consts/extension";
import nextApi from "../../services/nextApi";
import Editor from "../editor";
import { signProposalSettingsWith } from "frontedUtils/signData";
import useSignApiData from "hooks/useSignApiData";

function WhyProposalTemplate() {
  return (
    <InnerWrapper>
      <Title>Why Proposal Template</Title>
      <div className="flex flex-col text-textTertiary text14Medium leading-[20px]">
        <div className="flex">
          <span className="text-[20px] mx-[6px]">·</span>
          <span>
            With proposal templates, we can standardize the way proposals look
            and feel, helping users to publish high-quality content that
            accurately and professionally represent their proposal.
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
  );
}

function TitleField({ title, setTitle }) {
  return (
    <InnerWrapper>
      <Title>Title</Title>
      <Input
        placeholder="Please text here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </InnerWrapper>
  );
}

function ContentField({ content, setContent }) {
  return (
    <InnerWrapper>
      <Title>Content</Title>
      <Editor content={content} setContent={setContent} showButtons={false} />
    </InnerWrapper>
  );
}

export default function ProposalTemplate({ space, settings }) {
  const dispatch = useDispatch();
  const account = useSelector(loginAccountSelector);
  const { proposalTemplate } = settings;
  const [title, setTitle] = useState(proposalTemplate?.title);
  const [content, setContent] = useState(proposalTemplate?.content);
  const [contentType] = useState(proposalTemplate?.contentType || "markdown");
  const [isLoading, setIsLoading] = useState(false);
  const signApiData = useSignApiData();

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
      signedData = await signProposalSettingsWith(signApiData, settings);
    } catch (e) {
      const errorMessage = e.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      setIsLoading(false);
      return;
    }

    try {
      const { result, error } = await nextApi.post(
        `${space.id}/proposals/settings`,
        signedData,
      );
      if (result) {
        dispatch(newSuccessToast("Settings saved successfully!"));
      }
      if (error) {
        dispatch(newErrorToast(error.message));
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, account, title, content, contentType, space, signApiData]);

  return (
    <div
      className={cn(
        "flex flex-col grow p-[32px] max-sm:p-[20px] gap-[32px]",
        "border border-strokeBorderDefault bg-fillBgPrimary shadow-shadowCardDefault",
      )}
    >
      <div className="flex flex-col gap-[20px]">
        <WhyProposalTemplate />
        <TitleField title={title} setTitle={setTitle} />
        <ContentField content={content} setContent={setContent} />
      </div>
      <div className="flex flex-start">
        <Save disabled={disabled} loading={isLoading} onSave={onSave} />
      </div>
    </div>
  );
}

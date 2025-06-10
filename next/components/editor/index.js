import { cn } from "@osn/common-ui";
import dynamic from "next/dynamic";
import { useState } from "react";
import styled from "styled-components";
import LoadingEditor from "./loading";
import { code_block_pre, code_inline, code_pre_reset } from "../styles/editorStyles";

const RichEditor = dynamic(
  () => import("@osn/common-ui").then((mod) => mod.RichEditor),
  { ssr: false, loading: () => <LoadingEditor /> },
);


const EditorContainer = styled.div`  
  .rich-editor pre {
    ${code_block_pre}
  }

  .rich-editor code:not(pre code) {
    ${code_inline}
  }

  .rich-editor pre code {
    ${code_pre_reset}
  }
`;

export default function Editor(props) {
  const [isPreview, setIsPreview] = useState(false);
  return (
    <EditorContainer
      className={cn(
        "relative",
        isPreview
          ? "min-h-[182px] max-sm:min-h-[182px]"
          : "min-h-[182px] max-sm:min-h-[222px]",
        "[&_.rich-editor]:bg-fillBgPrimary",
      )}
    >
      <RichEditor {...props} onChangePreviewMode={setIsPreview} />
    </EditorContainer>
  );
}
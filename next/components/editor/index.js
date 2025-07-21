import dynamic from "next/dynamic";
import { useState } from "react";
import LoadingEditor from "./loading";
import styled from "styled-components";

const RichEditor = dynamic(
  () => import("@osn/common-ui").then((mod) => mod.RichEditor),
  { ssr: false, loading: () => <LoadingEditor /> },
);

const EditorWrapper = styled.div`
  position: relative;
  min-height: 182px;
  @media (max-width: 640px) {
    min-height: ${({ $preview }) => ($preview ? "182px" : "222px")};
  }

  & .rich-editor {
    background-color: var(--fillBgPrimary);
  }

  div ul.mention-list {
    background: var(--fillBgPrimary);
    li[aria-selected="true"],
    li:hover {
      background-color: var(--fillBgQuaternary);
    }
  }
`;

export default function Editor(props) {
  const [isPreview, setIsPreview] = useState(false);
  return (
    <EditorWrapper $preview={isPreview}>
      <RichEditor {...props} onChangePreviewMode={setIsPreview} />
    </EditorWrapper>
  );
}

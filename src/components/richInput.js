import styled, { css } from "styled-components";
import { useState } from "react";

import MarkdownEditor from "./markdownEditor";
import Mardown from "./markdown";

const MarkdownWrapper = styled.div``;

const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  > :not(:first-child) {
    margin-left: 16px;
  }
`;

const Button = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
`;

const ButtonPrimary = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  padding: 6px 12px;
  cursor: pointer;
  background: #191e27;
  color: #ffffff;
`;

const PreviewWrapper = styled.div`
  display: flex;
`;

const PrivewBar = styled.div`
  width: 4px;
  background: #eeeeee;
  flex: 0 0 auto;
`;

const PreviewContent = styled.div`
  margin-left: 8px;
  flex-grow: 1;
  max-width: 600px;
`;

const MarkdownEditorWrapper = styled.div`
  ${(p) =>
    p.preview &&
    css`
      height: 0;
      opacity: 0;
      pointer-events: none;
    `}
`;

export default function RichInput() {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  return (
    <div>
      <MarkdownWrapper>
        <MarkdownEditorWrapper preview={preview}>
          <MarkdownEditor content={content} setContent={setContent} />
        </MarkdownEditorWrapper>
        {preview && (
          <PreviewWrapper>
            <PrivewBar />
            <PreviewContent>
              <Mardown content={content} />
            </PreviewContent>
          </PreviewWrapper>
        )}
      </MarkdownWrapper>
      <ButtonsWrapper>
        <Button onClick={() => setPreview(!preview)}>
          {preview ? "Edit" : "Preview"}
        </Button>
        <ButtonPrimary>Comment</ButtonPrimary>
      </ButtonsWrapper>
    </div>
  );
}

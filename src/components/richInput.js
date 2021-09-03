import styled from "styled-components";
import { useState } from "react";

import MarkdownEditor from "./markdownEditor";

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

export default function RichInput() {
  const [content, setContent] = useState("");

  return (
    <div>
      <MarkdownEditor content={content} setContent={setContent} />
      <ButtonsWrapper>
        <Button>Preview</Button>
        <ButtonPrimary>Comment</ButtonPrimary>
      </ButtonsWrapper>
    </div>
  );
}

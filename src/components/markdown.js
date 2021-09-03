import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const Wrapper = styled.div`
  .markdown-content {
    word-wrap: break-word;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 500;

      :not(:first-child) {
        margin-top: 4px;
      }

      :not(:last-child) {
        margin-bottom: 4px;
      }

      :last-child {
        margin-bottom: 0;
      }
    }

    h1 {
      line-height: 32px;
      font-size: 20px;
    }

    h2 {
      line-height: 30px;
      font-size: 19px;
    }

    h3 {
      line-height: 28px;
      font-size: 18px;
    }

    h4 {
      line-height: 26px;
      font-size: 16px;
    }

    h5 {
      line-height: 24px;
      font-size: 15px;
    }

    h6 {
      line-height: 22px;
      font-size: 14px;
    }

    ol,
    ul {
      padding-left: 20px;
    }

    ul {
      list-style-type: disc;
    }

    blockquote {
      margin: 0;
      padding-left: 12px;
      border-left: 4px solid #eee;
    }

    pre {
      margin: 0;
      padding: 0 12px;
      background: #eee !important;
      border-radius: 4px;
      white-space: pre-wrap !important;

      > code {
        padding: 0 !important;
        background: transparent !important;
        white-space: pre-wrap !important;
      }
    }

    code {
      padding: 0 4px;
      background: #eee;
      border-radius: 4px;
    }

    a {
      color: #0974cd;
    }

    img {
      max-width: 100%;
    }

    p a::selection {
      background-color: transparent !important;
      color: inherit;
    }
  }
`;

export default function Mardown({ content }) {
  return (
    <Wrapper>
      <ReactMarkdown
        className="markdown-content"
        children={content}
        linkTarget="_blank"
      />
    </Wrapper>
  );
}

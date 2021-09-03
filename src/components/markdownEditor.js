import styled from "styled-components";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

const Wrapper = styled.div`
  .react-mde {
    border-color: #e2e8f0;
    textarea {
      border: none;
      padding: 12px 16px;
      font-size: 14px;
      line-height: 140%;
      outline: none;
      font-family: inherit;
      ::placeholder {
        color: #e3e7ed;
      }
    }
    .mde-header {
      display: flex;
      justify-content: space-between;
      background-color: #fbfcfe;
      border-bottom: 1px solid #e2e8f0;
      .mde-tabs {
        display: none;
      }
      .mde-header-group {
        padding: 8px 16px;
        .mde-header-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          margin: 0;
          :not(:first-child) {
            margin-left: 8px;
          }
        }
      }
    }
  }
  .mde-text {
    min-height: 60px;
  }
`;

export default function MarkdownEditor({ content, setContent }) {
  return (
    <Wrapper>
      <ReactMde
        value={content}
        onChange={setContent}
        toolbarCommands={[
          [
            "header",
            "bold",
            "italic",
            "quote",
            "ordered-list",
            "unordered-list",
            "link",
            "image",
            "code",
          ],
        ]}
        getIcon={(commandName) => {
          return <img src={`/imgs/icons/markdown/${commandName}.svg`} />;
        }}
        childProps={{
          textArea: {
            placeholder: "Please text here...",
          },
        }}
        initialEditorHeight={116}
      />
    </Wrapper>
  );
}

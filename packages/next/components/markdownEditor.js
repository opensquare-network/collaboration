import styled from "styled-components";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useRef } from "react";
import { no_scroll_bar } from "../styles/globalCss";
import { p_14_normal } from "../styles/textStyles";

const Wrapper = styled.div`
  .react-mde {
    border-top-color: #e2e8f0;
    border-bottom: none;
    border-left: none;
    border-right: none;
    textarea {
      padding: 12px 16px;
      border-bottom: 1px solid #e2e8f0;
      :hover, :focus, :active{
        border-color: #B7C0CC;
      }
      ${p_14_normal};
      outline: none;
      font-family: inherit;
      background-color: #fbfcfe;
      ::placeholder {
        color: #9da9bb;
      }
      ${no_scroll_bar};
    }
    .mde-header {
      display: flex;
      justify-content: space-between;
      background-color: #ffffff;
      border-bottom: none;
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
  const ref = useRef();
  return (
    <Wrapper>
      <ReactMde
        ref={ref}
        value={content}
        onChange={(content)=>{
          const textarea = ref?.current?.finalRefs?.textarea?.current;
          if(textarea){
            textarea.style.height = "116px";
            textarea.style.height = textarea.scrollHeight + 'px';
          }
          setContent(content)
        }}
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
          return <img src={`/imgs/icons/markdown/${commandName}.svg`} alt="" />;
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

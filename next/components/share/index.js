import { useState, useCallback } from "react";
import copy from "copy-to-clipboard";
import styled from "styled-components";
import { ReactComponent as Twitter } from "./twitter.svg";
import { ReactComponent as CopySvg } from "./copy.svg";
import Tooltip from "@/components/tooltip";

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
`;

const ShareItem = styled.span`
  cursor: pointer;
  &:hover {
    .twitter {
      rect {
        fill: #e6f4fe;
      }
      path {
        fill: #33a2f2;
      }
    }
    .copy {
      rect {
        fill: #edf7ed;
      }
      path {
        fill: #4caf50;
      }
    }
  }
`;

export default function Share({ uid }) {
  const [isCopied, setIsCopied] = useState(false);

  const tweet = useCallback(() => {
    const url =
      "https://twitter.com/share?url=" +
      encodeURIComponent(`${window.location.origin}/p/${uid}`) +
      "&text=" +
      encodeURIComponent(document.title);
    window.open(url, "_blank");
  }, [uid]);

  const copyLink = useCallback(() => {
    copy(`${window.location.origin}/p/${uid}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [uid]);

  return (
    <Wrapper>
      <ShareItem onClick={tweet}>
        <Twitter className="twitter" />
      </ShareItem>
      <ShareItem onClick={copyLink}>
        <Tooltip content={isCopied ? "Copied" : "Copy Short Link"} size="fit">
          <CopySvg className="copy" />
        </Tooltip>
      </ShareItem>
    </Wrapper>
  );
}

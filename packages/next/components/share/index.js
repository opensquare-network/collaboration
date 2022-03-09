import { useState, useCallback } from "react";
import copy from "copy-to-clipboard";
import styled from "styled-components";
import Twitter from "./twitter.svg";
import TwitterActive from "./twitter-active.svg";
import CopySvg from "./copy.svg";
import CopyActive from "./copy-active.svg";
import Tooltip from "@/components/tooltip";

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
`;

const ShareItem = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
`;

export default function Share({}) {
  const [isCopied, setIsCopied] = useState(false);
  const [twitterActive, setTwitterActive] = useState(false);
  const [copyActive, setCopyActive] = useState(false);

  const tweet = useCallback(() => {
    const url =
      "https://twitter.com/share?url=" +
      encodeURIComponent(window.location.href) +
      "&text=" +
      encodeURIComponent(document.title);
    window.open(
      url,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
    );
  }, []);

  const copyLink = useCallback(() => {
    copy(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, []);

  return (
    <Wrapper>
      <ShareItem
        onClick={tweet}
        onMouseEnter={() => setTwitterActive(true)}
        onMouseLeave={() => setTwitterActive(false)}
      >
        {twitterActive ? <TwitterActive /> : <Twitter />}
      </ShareItem>
      <ShareItem
        onClick={copyLink}
        onMouseEnter={() => setCopyActive(true)}
        onMouseLeave={() => setCopyActive(false)}
      >
        <Tooltip content={isCopied ? "Copied" : ""} size="fit">
          {copyActive ? <CopyActive /> : <CopySvg />}
        </Tooltip>
      </ShareItem>
    </Wrapper>
  );
}

import { useState, useCallback } from "react";
import copy from "copy-to-clipboard";
import styled from "styled-components";
import TwitterSvg from "public/imgs/icons/share-twitter.svg";
import CopySvg from "public/imgs/icons/copy.svg";

const Wrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-bottom: 32px;
`;

const ShareItem = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  :hover {
    svg path {
      fill: rgba(80, 97, 118, 1);
    }
  }
`;

export default function Share({}) {
  const [isCopied, setIsCopied] = useState(false);

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
    }, 3000);
  }, []);

  return (
    <Wrapper>
      <ShareItem onClick={tweet}>
        <TwitterSvg />
        Twitter
      </ShareItem>
      <ShareItem onClick={copyLink}>
        <CopySvg />
        {isCopied ? "Copied" : "Copy Link"}
      </ShareItem>
    </Wrapper>
  );
}

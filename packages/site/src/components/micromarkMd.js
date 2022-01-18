import styled from "styled-components";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import { matchMdLink } from "frontedUtils";
import sanitizeHtml from "sanitize-html";
import { useEffect } from "react";
import { no_scroll_bar } from "../styles/componentCss";

const Wrapper = styled.div`
  font-size: 16px;
  &.markdown-content {
    color: #000;
    max-width: 48.5em;
    word-break: normal;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 500;

      :not(:first-child) {
        margin-top: 0.25em;
      }

      :not(:last-child) {
        margin-bottom: 0.25em;
      }

      :last-child {
        margin-bottom: 0;
      }
    }

    h1 {
      line-height: 2em;
      font-size: 1.25em;
    }

    h2 {
      line-height: 1.875em;
      font-size: 1.1875em;
    }

    h3 {
      line-height: 1.75em;
      font-size: 1.125em;
    }

    h4 {
      line-height: 1.625em;
      font-size: 1em;
    }

    h5 {
      line-height: 1.5em;
      font-size: 0.9375em;
    }

    h6 {
      line-height: 1.375em;
      font-size: 0.875em;
    }

    p,
    li {
      max-width: 48.5em;
      font-size: 0.875em;
      line-height: 1.375em;
      word-break: break-word;
    }

    ol,
    ul {
      padding-left: 1.25em;
    }

    ul {
      list-style-type: disc;
    }

    blockquote {
      margin: 0;
      padding-left: 0.75em;
      border-left: 4px solid #eee;
    }

    pre {
      ${no_scroll_bar};
      * {
        font-family: i-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
          Liberation Mono, monospace !important;
      }
      margin: 8px 0;
      padding: 0 1em;
      background: #f5f8fa !important;
      border-radius: 0.25em;
      white-space: pre-wrap !important;
      overflow-x: scroll;

      > code {
        padding: 0 !important;
        background: transparent !important;
        white-space: pre-wrap !important;
        span.identifier {
          white-space: nowrap !important;
        }
      }
    }

    code {
      font-family: i-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
        Liberation Mono, monospace !important;
      ${no_scroll_bar};
      max-width: 100%;
      margin: 16px 0;
      padding: 0 0.25em;
      background: #f5f8fa !important;
      border-radius: 0.25em;
      white-space: nowrap !important;
      word-break: keep-all;
      overflow-x: scroll;
      display: block;
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

    th,
    td {
      border: 1px solid #e0e4eb;
    }

    table {
      margin: 8px 0;
      border-collapse: collapse;
      max-width: 100%;
      overflow: auto;
      display: block;
    }

    th {
      padding: 10px 16px;
      background: #f6f7fa;
      font-weight: bold;
      font-size: 14px;
      color: #1e2134;
      min-width: 100px;
    }

    td {
      padding: 10px 16px;
      font-size: 14px;
      color: #1e2134;
    }
  }
`;

export default function MicromarkMd({ md = "" }) {
  const linkMd = matchMdLink(md);
  const displayContent = linkMd.replace(/\n+/g, function (ns) {
    if (ns.length == 1) return "  " + ns;
    return ns;
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/prism.js";
    document.body.appendChild(script);
  }, []);

  const html = micromark(displayContent, {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });

  const cleanHtml = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "iframe",
      "br",
    ]),
    allowedAttributes: {
      img: ["src", "size", "width", "height"],
      iframe: ["src", "width", "height"],
      a: ["href", "rel", "target"],
      "*": ["class"],
      td: ["align"],
      th: ["align"],
    },
  });

  return (
    <Wrapper
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

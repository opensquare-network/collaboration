import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import OsnPagination from "@osn/common-ui/es/styled/Pagination";

import { encodeURIQuery } from "../frontedUtils/index";

const Wrapper = styled.div`
  a {
    color: inherit;
    text-align: center;
    width: 100%;
  }
`;

export default function Pagination({
  page,
  pageSize,
  total,
  otherQueries = {},
  pageKey = "page",
}) {
  const router = useRouter();

  const itemRender = (page, _type, originalElement) => {
    return (
      <Link
        style={{ color: "inherit" }}
        href={`${router.pathname}?${encodeURIQuery({
          ...router.query,
          [pageKey]: page,
          ...otherQueries,
        })}`}
        passHref
        legacyBehavior
      >
        {originalElement}
      </Link>
    );
  };

  return (
    <Wrapper>
      <OsnPagination
        page={page}
        pageSize={pageSize}
        total={total}
        itemRender={itemRender}
      />
    </Wrapper>
  );
}

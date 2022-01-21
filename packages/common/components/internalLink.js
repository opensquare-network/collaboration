import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  cursor: pointer;
  > a {
    :hover {
      color: inherit;
      text-decoration: underline;
    }
  }
`;

export default function InternalLink({ href, children }) {
  return href ? (
    <Wrapper>
      <Link href={href} passHref>
        {children}
      </Link>
    </Wrapper>
  ) : (
    <>{children}</>
  );
}

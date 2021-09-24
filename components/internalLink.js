import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  cursor: pointer;
`;

export default function InternalLink({ href, children }) {
  return href ? (
    <Wrapper>
      <Link href={href}>{children}</Link>
    </Wrapper>
  ) : (
    <>{children}</>
  );
}

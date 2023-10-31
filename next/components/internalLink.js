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
    <Wrapper
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Link href={href} passHref legacyBehavior>
        <div>{children}</div>
      </Link>
    </Wrapper>
  ) : (
    <>{children}</>
  );
}

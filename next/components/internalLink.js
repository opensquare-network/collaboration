import styled from "styled-components";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(href);
  };

  return href ? (
    <Wrapper
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleClick(e);
        }
      }}
      role="link"
      tabIndex={0}
    >
      {children}
    </Wrapper>
  ) : (
    <>{children}</>
  );
}

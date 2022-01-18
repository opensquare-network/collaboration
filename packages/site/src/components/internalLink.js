import styled from "styled-components";
import { Link } from "react-router-dom";

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
      <Link to={href} passHref>
        {children}
      </Link>
    </Wrapper>
  ) : (
    <>{children}</>
  );
}

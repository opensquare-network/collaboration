import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;
  > a {
    color: initial;
  }
`;

export default function HardLink({ href, children }) {
  return href ? (
    <Wrapper>
      <a href={href}>
        {children}
      </a>
    </Wrapper>
  ) : (
    <>{children}</>
  );
}

import styled from "styled-components";

const Wrapper = styled.a`
  :hover {
    color: inherit;
    text-decoration: underline;
  }
  
  display: inline-flex;
  align-items: center;
`;

export default function ExternalLink({ href, children }) {
  return (
    <Wrapper
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </Wrapper>
  );
}

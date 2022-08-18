import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;
`;

const navigate = (href) => window.location.assign(href);

export default function HardLink({ href, children }) {
  return href ? (
    <Wrapper onClick={() => navigate(href)}>{children}</Wrapper>
  ) : (
    <>{children}</>
  );
}

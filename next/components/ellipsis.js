import styled from "styled-components";

const Text = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default function Ellipsis({ width, children }) {
  return (
    <Text style={{ ...(width ? { maxWidth: width } : {}) }}>{children}</Text>
  );
}

import styled from "styled-components";
import { Index } from "./styled";

const Wrapper = styled(Index)`
  background: #04d2c5;
  color: var(--textPrimary);
  border-color: var(--strokeBgBrandSecondary);
`;

export default function CurrentIndex({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

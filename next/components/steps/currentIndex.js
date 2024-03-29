import styled from "styled-components";
import { Index } from "./styled";

const Wrapper = styled(Index)`
  background: var(--fillBgBrandSecondary);
  color: var(--textPrimaryContrast);
  border-color: var(--strokeBgBrandSecondary);
`;

export default function CurrentIndex({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

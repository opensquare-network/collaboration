import styled from "styled-components";
import { ReactComponent as CheckedSVG } from "./checked.svg";
import { Index } from "./styled";

const Wrapper = styled(Index)`
  border-color: var(--strokeBgBrandSecondary);
`;

export default function CheckedIndex() {
  return (
    <Wrapper>
      <CheckedSVG />
    </Wrapper>
  );
}

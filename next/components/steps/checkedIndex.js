import styled from "styled-components";
import { ReactComponent as CheckedSVG } from "./checked.svg";
import { Index } from "./styled";

const Wrapper = styled(Index)`
  border-color: #04d2c5;
`;

export default function CheckedIndex() {
  return (
    <Wrapper>
      <CheckedSVG />
    </Wrapper>
  );
}

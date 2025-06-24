import { ReactComponent as BackSVG } from "./back.svg";
import styled from "styled-components";
import { Button } from "@osn/common-ui";

const Wrapper = styled.div`
  > button {
    padding: 12px;
    line-height: 0;
  }
`;

export default function BackButton({ onClick }) {
  return (
    <Wrapper>
      <Button onClick={onClick}>
        <BackSVG />
      </Button>
    </Wrapper>
  );
}

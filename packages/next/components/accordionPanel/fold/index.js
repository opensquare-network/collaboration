import React, { memo } from "react";
import styled from "styled-components";
import { ReactComponent as CaretDown } from "./caret-down.svg";

const Wrapper = styled.span`
  cursor: pointer;

  &:hover {
    svg {
      transform: rotate(${(props) => (props.fold ? 180 : 0)}deg);
    }
    path {
      fill: #506176;
    }
  }
`;

function Fold({ fold, setFold }) {
  return (
    <Wrapper onClick={() => setFold(!fold)} fold={fold}>
      <CaretDown />
    </Wrapper>
  );
}

export default memo(Fold);

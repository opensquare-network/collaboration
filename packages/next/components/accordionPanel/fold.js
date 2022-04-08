import React, { memo, useState } from "react";
import styled from "styled-components";
import Caret from "@/components/caret";

const Wrapper = styled.span`
  cursor: pointer;
`;

function Fold({ fold, setFold }) {
  const [isHoverCaret, setIsHoverCaret] = useState(false);

  return (
    <Wrapper
      onClick={() => setFold(!fold)}
      onMouseEnter={() => setIsHoverCaret(true)}
      onMouseLeave={() => setIsHoverCaret(false)}
    >
      <Caret isHover={isHoverCaret} down={!fold} />
    </Wrapper>
  );
}

export default memo(Fold);

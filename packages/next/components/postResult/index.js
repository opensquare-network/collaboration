import styled from "styled-components";
import { useRef, useState } from "react";

import { ReactComponent as StatusSvg } from "public/imgs/icons/status.svg";
import { useOffset } from "frontedUtils/hooks";
import Popup from "./popup";

const Wrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 40px;
  margin: -8px 0 -8px 40px;
  padding: 8px 0;
  > svg {
    display: none;
  }
  svg {
    fill: #a1a8b3;
  }
  :hover {
    svg {
      fill: #506176;
    }
  }
`;

export default function ResultPopup({ data, space }) {
  const ref = useRef();
  const { top } = useOffset(ref);
  const [show, setShow] = useState(false);

  return (
    <Wrapper
      ref={ref}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <IconWrapper className="icon">
        <StatusSvg />
      </IconWrapper>
      {show && <Popup data={data} space={space} isTop={top > 400} />}
    </Wrapper>
  );
}

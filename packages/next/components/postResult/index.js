import styled from "styled-components";
import { useRef, useState } from "react";

import StatusSvg from "public/imgs/icons/status.svg";
import { useOffset } from "frontedUtils/hooks";
import Popup from "./popup";

const Wrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 40px;
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
    <Wrapper ref={ref}>
      <IconWrapper
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="icon"
      >
        <StatusSvg />
      </IconWrapper>
      {/* {show && <Popup data={data} isTop={top > 400} />} */}
      <Popup data={data} space={space} isTop={top > 400} />
    </Wrapper>
  );
}

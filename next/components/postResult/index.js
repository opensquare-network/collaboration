import styled from "styled-components";
import { useRef, useState } from "react";

import { ReactComponent as StatusSvg } from "public/imgs/icons/status.svg";
import { useOffset } from "frontedUtils/hooks";
import Popup from "./popup";
import SocietyPopup from "./societyPopup";
import {
  hasOnePersonOneVoteStrategyOnly,
  hasSocietyVoteStrategyOnly,
} from "frontedUtils/strategy";

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
    fill: var(--textTertiary);
  }
  :hover {
    svg {
      fill: var(--textSecondary);
    }
  }
`;

export default function ResultPopup({ data, space }) {
  const ref = useRef();
  const { top } = useOffset(ref);
  const [show, setShow] = useState(false);

  const isSocietyProposal =
    hasSocietyVoteStrategyOnly(data?.weightStrategy) ||
    hasOnePersonOneVoteStrategyOnly(data?.weightStrategy);
  const PopupComponent = isSocietyProposal ? SocietyPopup : Popup;

  return (
    <Wrapper
      ref={ref}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <IconWrapper className="icon">
        <StatusSvg />
      </IconWrapper>
      {show && <PopupComponent data={data} space={space} isTop={top > 400} />}
    </Wrapper>
  );
}

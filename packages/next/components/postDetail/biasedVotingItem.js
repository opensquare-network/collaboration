import styled from "styled-components";
import Tooltip from "../tooltip";
import ValueDisplay from "../valueDisplay";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-item: center;
  width: 100%;
  .noHover {
    pointer-events: none;
  }
`;

const LabelWrapper = styled.div`
  color: #506176;
  position: relative;
  max-width: 50%;

  > div {
    position: initial;
  }
`;

const TextEllipsis = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function BiasedVotingItem({ label = "", value, space }) {
  const ref = useRef();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setShowTooltip(ref?.current?.offsetWidth > 111);
  }, []);

  return (
    <Wrapper>
      <LabelWrapper className={!showTooltip && "noHover"} ref={ref}>
        <Tooltip content={label} size="full">
          <TextEllipsis>{label}</TextEllipsis>
        </Tooltip>
      </LabelWrapper>
      <ValueDisplay value={value} space={space} />
    </Wrapper>
  );
}

export default BiasedVotingItem;

import styled from "styled-components";
import { ReactComponent as TimeIcon } from "public/imgs/icons/timeline.svg";
import { p_14_normal } from "../styles/textStyles";

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 12px 16px;
  background: var(--fillBgSecondary);
  border: 1px solid var(--strokeActionDefault);
  ${p_14_normal};
`;

function Datetime({ datetime }) {
  return (
    <Wrapper>
      <TimeIcon />
      <span>{datetime?.toString()?.slice(0, 21)}</span>
    </Wrapper>
  );
}

export default Datetime;

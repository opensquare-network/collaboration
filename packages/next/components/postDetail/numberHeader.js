import styled from "styled-components";
import { memo } from "react";

const Wrapper = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 0;

  span {
    margin-left: 4px;
    color: #a1a8b3;
    font-weight: 500;
  }
`;

function HeaderWithNumber({ title = "", number = 0 }) {
  return (
    <Wrapper>
      {title}
      <span>·</span>
      <span className="number">{number}</span>
    </Wrapper>
  );
}

export default memo(HeaderWithNumber);

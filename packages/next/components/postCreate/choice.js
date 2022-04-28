import styled, { css } from "styled-components";
import { useRef, useState } from "react";

import { ReactComponent as Substract } from "public/imgs/icons/substract.svg";
import { p_14_medium } from "../../styles/textStyles";
import { FlexBetween } from "@osn/common-ui";

const Wrapper = styled(FlexBetween)`
  padding: 12px 24px;
  border: 1px solid #e2e8f0;
  ${p_14_medium};
  :hover {
    border-color: #b7c0cc;
  }
  ${(p) =>
    p.focus &&
    css`
      border-color: #b7c0cc;
    `}
`;

const Input = styled.input`
  all: unset;
  flex-grow: 1;
  margin: 0 8px;
  min-width: 0;
  text-align: center;
  ${p_14_medium};
  color: #1e2134;
`;

const SubstractButtonWrapper = styled.div`
  width: 20px;
  height: 20px;
`;

const SubstractButton = styled(Substract)`
  flex: 0 0 auto;
  cursor: pointer;
  fill: #9da9bb;
  :hover {
    fill: #2e343d;
  }
`;

export default function Choice({
  index,
  value,
  onChange,
  onDelete,
  unDeletable,
}) {
  const [focus, setFocus] = useState(false);
  const ref = useRef();

  return (
    <Wrapper focus={focus} onClick={() => ref.current.focus()}>
      <div>{`#${index + 1}`}</div>
      <Input
        ref={ref}
        // autoFocus
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value}
        onChange={(e) => onChange(e.target.value, index)}
      />
      <SubstractButtonWrapper>
        {!unDeletable && (
          <SubstractButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete(index);
            }}
          />
        )}
      </SubstractButtonWrapper>
    </Wrapper>
  );
}

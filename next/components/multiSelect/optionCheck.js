import styled from "styled-components";
import { ReactComponent as CheckedSVG } from "./checked.svg";
import { ReactComponent as UncheckedSVG } from "./unchecked.svg";
import { noop } from "@osn/common-ui";

const Wrapper = styled.div`
  cursor: pointer;
`;

export default function OptionCheck({ checked, onChecked = noop }) {
  return (
    <Wrapper onClick={() => onChecked(!checked)}>
      {checked ? <CheckedSVG /> : <UncheckedSVG />}
    </Wrapper>
  );
}

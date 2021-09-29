import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";
import { useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { useOnClickOutside } from "utils/hooks";
import CaretRight from "/public/imgs/icons/caret-right.svg";

const Wrapper = styled.div`
  position: relative;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const Button = styled.div`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  display: flex;
  cursor: pointer;
  .placeholder {
    color: #9da9bb;
  }
  > div {
    flex-grow: 1;
  }
  > svg {
    flex: 0 0 24px;
    fill: #506176;
  }
  ${(p) =>
    p.active &&
    css`
      border-color: #b7c0cc;
    `}
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
`;

export default function Component({ date, setDate, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper ref={ref}>
      <Button onClick={handleClick} active={isOpen}>
        {date && <div>{moment(date).format("MMM,DD YYYY HH:mm")}</div>}
        {!date && <div className="placeholder">{placeholder}</div>}
        <CaretRight />
      </Button>
      {isOpen && (
        <DatePickerWrapper>
          <DatePicker
            selected={date}
            onChange={handleChange}
            inline
            showTimeInput
            todayButton="Today"
          />
        </DatePickerWrapper>
      )}
    </Wrapper>
  );
}

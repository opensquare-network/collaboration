import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";
import { useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { useOnClickOutside } from "utils/hooks";
import CaretRight from "/public/imgs/icons/caret-right.svg";
import ArrowLeft from "/public/imgs/icons/arrow-left.svg";
import ArrowRight from "/public/imgs/icons/arrow-right.svg";
import Button from "components/button";

const Wrapper = styled.div`
  position: relative;
`;

const DateTimeWrapper = styled.div``;

const DateButton = styled.div`
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

const DateWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  padding: 32px;
  background: #ffffff;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),
    0px 0.751293px 8px rgba(26, 33, 44, 0.04);

  .react-datepicker__header {
    background: transparent;
    border: none;
    padding: 0;
    padding-bottom: 8px;
  }

  .react-datepicker__day-name {
    width: 40px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #506176;
    margin: 0 !important;
    :not(:first-child) {
      margin-left: 4px !important;
    }
  }

  .react-datepicker {
    border-radius: 0;
    border: none;
  }

  .react-datepicker__week {
    :not(:first-child) {
      margin-top: 4px !important;
    }
  }

  .react-datepicker__day {
    width: 40px;
    height: 40px;
    font-family: Inter;
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
    color: #1e2134;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    margin: 0 !important;
    :not(:first-child) {
      margin-left: 4px !important;
    }
    :hover {
      background: #f0f3f8;
    }
  }

  .react-datepicker__day--today {
    font-weight: 600;
  }

  .react-datepicker__day--selected {
    background: #f0f3f8;
  }

  .react-datepicker__day--outside-month {
    color: #9da9bb;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }
`;

const DateHeader = styled.div`
  display: flex;
  align-items: center;
  > div {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #1e2134;
    flex: 1 1 auto;
  }
  > svg {
    cursor: pointer;
    path {
      fill: #506176;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 16px 0;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > :not(:first-child) {
    margin-left: 16px;
  }
`;

export default function Component({ date, setDate, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));
  const handleChange = (e) => {
    // setIsOpen(!isOpen);
    console.log(e);
    setDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const onToday = () => {
    console.log("onToday");
    if (date) {
    } else {
      setDate(
        moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate()
      );
    }
  };

  return (
    <Wrapper ref={ref}>
      <DateTimeWrapper>
        <DateButton onClick={handleClick} active={isOpen}>
          {date && <div>{moment(date).format("MMM,DD YYYY HH:mm")}</div>}
          {!date && <div className="placeholder">{placeholder}</div>}
          <CaretRight />
        </DateButton>
        {isOpen && (
          <DateWrapper>
            <DatePicker
              selected={date}
              onChange={handleChange}
              inline
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div>
                  <DateHeader>
                    <ArrowLeft onClick={decreaseMonth} />
                    <div>{moment(date).format("MMM, YYYY")}</div>
                    <ArrowRight onClick={increaseMonth} />
                  </DateHeader>
                  <Divider />
                </div>
              )}
              formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
            />
            <ButtonWrapper>
              <Button onClick={onToday}>Today</Button>
              <Button primary>Next</Button>
            </ButtonWrapper>
          </DateWrapper>
        )}
      </DateTimeWrapper>
    </Wrapper>
  );
}

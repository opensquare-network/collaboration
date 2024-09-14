import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";
import { useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { useOnClickOutside } from "frontedUtils/hooks";
import { ReactComponent as CaretRight } from "/public/imgs/icons/caret-right.svg";
import { ReactComponent as ArrowLeft } from "/public/imgs/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "/public/imgs/icons/arrow-right.svg";
import {
  p_14_medium,
  p_14_normal,
  p_16_normal,
  p_16_semibold,
} from "../styles/textStyles";
import { Flex, FlexBetween, Button } from "@osn/common-ui";

const Wrapper = styled.div`
  position: relative;
`;

const DateTimeWrapper = styled.div``;

const DateButton = styled.div`
  padding: 12px 16px;
  border: 1px solid var(--strokeActionDefault);
  display: flex;
  ${(p) =>
    p.disabled
      ? css`
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;
          :hover {
            border-color: var(--strokeActionActive);
          }
        `}
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  .placeholder {
    color: var(--textTertiary);
  }
  > div {
    flex-grow: 1;
  }
  > svg {
    flex: 0 0 24px;
    fill: var(--textSecondary);
  }
  ${(p) =>
    p.active &&
    css`
      border-color: var(--strokeActionActive);
    `}
`;

const DateWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  padding: 24px;
  background: var(--fillBgPrimary);
  box-shadow: var(--shadowPopup);

  .react-datepicker__header {
    background: transparent;
    border: none;
    padding: 0;
  }

  .react-datepicker__day-name {
    width: 40px;
    font-family: var(--font-inter), sans-serif;
    ${p_14_medium};
    text-align: center;
    color: var(--textSecondary);
    margin: 0 !important;
  }

  .react-datepicker__day-names {
    margin-bottom: 8px;
  }

  .react-datepicker {
    border-radius: 0;
    border: none;
    background: transparent;
  }

  .react-datepicker__month {
    margin: 0;
  }

  .react-datepicker__day {
    width: 40px;
    height: 40px;
    font-family: var(--font-inter), sans-serif;
    ${p_14_normal};
    color: var(--textPrimary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    margin: 0 !important;
    :hover {
      background-color: var(--fillBgTertiary);
    }
  }

  .react-datepicker__day--today {
    font-weight: 600;
    border: 1px solid var(--strokeActionDefault);
  }

  .react-datepicker__day--selected {
    background-color: var(--fillBgTertiary);
  }

  .react-datepicker__day--outside-month {
    color: var(--textTertiary);
  }

  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }

  .react-datepicker__day--disabled {
    color: var(--textTertiary);
    cursor: not-allowed;
    &:hover {
      background: none;
    }
  }
`;

const DateHeader = styled(Flex)`
  > div {
    font-family: var(--font-inter), sans-serif;
    ${p_16_semibold};
    text-align: center;
    color: var(--textPrimary);
    flex: 1 1 auto;
  }
  > svg {
    cursor: pointer;
    path {
      fill: var(--textSecondary);
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--fillBgTertiary);
  margin: 16px 0;
`;

const ButtonWrapper = styled(Flex)`
  margin-top: 20px;
  justify-content: flex-end;
  > :not(:first-child) {
    margin-left: 16px;
  }
`;

const TimeWrapper = styled.div`
  z-index: 2;
  position: absolute;
  right: 0;
  padding: 24px;
  background: var(--fillBgPrimary);
  box-shadow: var(--shadowPopup);
`;

const TimeHeaderWrapper = styled(FlexBetween)`
  ${p_16_normal};
  white-space: nowrap;
  > :first-child {
    font-weight: 600;
    color: var(--textPrimary);
  }
  > :last-child {
    color: var(--textTertiary);
    font-size: 14px;
  }
`;

const TimeInputWrapper = styled(FlexBetween)`
  margin: 20px 0;
  padding: 12px 4px;
  width: 280px;
  height: 48px;
  border-bottom: 1px solid var(--strokeActionDefault);
  ${p_14_normal};
  background: var(--fillBgSecondary);
`;

const TimeInput = styled.input`
  all: unset;
  width: 128px;
  height: 24px;
  text-align: center;
`;

export default function Component({
  date,
  setDate,
  placeholder,
  minDate,
  maxDate,
  button,
  onSelect = () => {},
  defaultTime = "00:00",
  disabled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState("date");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const ref = useRef();
  const today = moment()
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toDate();
  useOnClickOutside(ref, () => setIsOpen(false));
  const handleChange = (e) => {
    setDate(e);
  };
  const handleClick = (e) => {
    if (disabled) {
      return;
    }
    e.preventDefault();
    setShow("date");
    setIsOpen(!isOpen);
  };
  const onToday = () => {
    if (date) {
      setDate(
        moment(date)
          .set({
            year: today.year(),
            month: today.month(),
            date: today.date(),
          })
          .toDate(),
      );
    } else {
      setDate(today);
    }
  };
  const checkInt = (value) => {
    if (value && value.indexOf(".") > 0) return false;
    return !(isNaN(value) && !Number.isInteger(Number(value)));
  };
  const isToday = (date) => {
    return date.getTime() === today.getTime();
  };
  const onHourChange = (e) => {
    let value = e.target.value;
    if (value.length > 2 && value[0] === "0") {
      value = value.slice(1, 3);
    }
    if (!checkInt(value)) return;
    if (Number(value) > 23 || Number(value) < 0) return;
    setHour(value);
  };
  const onMinuteChange = (e) => {
    let value = e.target.value;
    if (value.length > 2 && value[0] === "0") {
      value = value.slice(1, 3);
    }
    if (!checkInt(value)) return;
    if (Number(value) > 59 || Number(value) < 0) return;
    setMinute(value);
  };
  const format = (value) => {
    if (value === null || value === undefined) return "";
    if (value < 10) return "0" + value;
    return "" + value;
  };
  const formatTime = () => {
    let hour = defaultTime?.split(":")?.[0] || "00";
    let minute = defaultTime?.split(":")?.[1] || "00";
    if (date) {
      hour = moment(date).hour();
      minute = moment(date).minute();
      if (isToday(date) && defaultTime === "now") {
        const now = new Date();
        hour = now.getHours();
        minute = now.getMinutes();
      }
    }
    setHour(format(hour));
    setMinute(format(minute));
    setDate(moment(date).set({ hour, minute }).toDate());
  };
  const onSelectTime = () => {
    setDate(
      moment(date)
        .set({ hour: Number(hour), minute: Number(minute) })
        .toDate(),
    );
    onSelect();
  };

  return (
    <Wrapper ref={ref}>
      <DateTimeWrapper>
        {button ? (
          <div onClick={handleClick}>{button}</div>
        ) : (
          <DateButton disabled={disabled} onClick={handleClick} active={isOpen}>
            {date && <div>{moment(date).format("MMM,DD YYYY HH:mm")}</div>}
            {!date && <div className="placeholder">{placeholder}</div>}
            <CaretRight />
          </DateButton>
        )}
        {isOpen && (
          <>
            {show === "date" && (
              <DateWrapper>
                <DatePicker
                  selected={date}
                  minDate={minDate}
                  maxDate={maxDate}
                  onChange={handleChange}
                  inline
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                  }) => (
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
                  <Button
                    primary
                    disabled={!date}
                    onClick={() => {
                      if (!date) onToday();
                      formatTime();
                      setShow("time");
                    }}
                  >
                    Next
                  </Button>
                </ButtonWrapper>
              </DateWrapper>
            )}
            {show === "time" && (
              <TimeWrapper>
                <TimeHeaderWrapper>
                  <div>Select Time</div>
                  <div>{moment(date).format("MMM,DD YYYY")}</div>
                </TimeHeaderWrapper>
                <Divider />
                <TimeInputWrapper>
                  <TimeInput
                    value={hour}
                    onChange={onHourChange}
                    placeholder="00"
                  />
                  <div>:</div>
                  <TimeInput
                    value={minute}
                    onChange={onMinuteChange}
                    placeholder="00"
                  />
                </TimeInputWrapper>
                <ButtonWrapper>
                  <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                  <Button
                    primary
                    onClick={() => {
                      onSelectTime();
                      setIsOpen(false);
                    }}
                  >
                    Select
                  </Button>
                </ButtonWrapper>
              </TimeWrapper>
            )}
          </>
        )}
      </DateTimeWrapper>
    </Wrapper>
  );
}

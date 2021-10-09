import styled from "styled-components";
import { useState, useRef } from "react";

import { useOnClickOutside, useWindowSize } from "utils/hooks";
import { addressEllipsis } from "utils";
import CaretDown from "public/imgs/icons/caret-right.svg";

const Wrapper = styled.div`
  background: #fbfcfe;
  padding: 20px;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.div`
  background: #ffffff;
  padding: 11px 15px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  > svg {
    fill: #506176;
    transform: rotate(90deg);
    margin-left: 12px;
  }
  :hover {
    border-color: #b7c0cc;
  }
`;

const AccountWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 16px;
  }
  > img {
    width: 40px;
    height: 40px;
  }
`;

const AccountDetail = styled.div`
  > :first-child {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  > :last-child {
    font-size: 14px;
    line-height: 24px;
    color: #c0c8d5;
    word-break: break-all;
  }
`;

const Option = styled.div`
  position: absolute;
  background: #ffffff;
  padding: 8px 0;
  max-height: 232px;
  width: 100%;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),
    0px 0.751293px 8px rgba(26, 33, 44, 0.04);
`;

const OptionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  :hover {
    background: #fbfcfe;
  }
`;

export default function PostAccounts() {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const { width } = useWindowSize();
  useOnClickOutside(ref, () => setShow(false));

  return (
    <Wrapper>
      <SelectWrapper ref={ref}>
        <Select onClick={() => setShow(!show)}>
          <AccountWrapper>
            <img src="/imgs/avatar.png" alt="" />
            <AccountDetail>
              <div>Popouloss</div>
              <div>
                {width && width <= 1020
                  ? addressEllipsis(
                      "G4X89RHHZN4b2urdizWas8hctos3L1qXSmTEvggqobC1rXk"
                    )
                  : "G4X89RHHZN4b2urdizWas8hctos3L1qXSmTEvggqobC1rXk"}
              </div>
            </AccountDetail>
          </AccountWrapper>
          <CaretDown />
        </Select>
        {show && (
          <Option>
            <OptionItem onClick={() => setShow(false)}>
              <AccountWrapper>
                <img src="/imgs/avatar.png" alt="" />
                <AccountDetail>
                  <div>Popouloss</div>
                  <div>
                    {width && width <= 620
                      ? addressEllipsis(
                          "G4X89RHHZN4b2urdizWas8hctos3L1qXSmTEvggqobC1rXk"
                        )
                      : "G4X89RHHZN4b2urdizWas8hctos3L1qXSmTEvggqobC1rXk"}
                  </div>
                </AccountDetail>
              </AccountWrapper>
            </OptionItem>
          </Option>
        )}
      </SelectWrapper>
    </Wrapper>
  );
}

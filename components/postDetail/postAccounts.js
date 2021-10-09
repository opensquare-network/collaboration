import styled from "styled-components";
import { useState, useRef } from "react";

import { useOnClickOutside, useWindowSize } from "utils/hooks";
import { addressEllipsis } from "utils";
import Avatar from "components/avatar";
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

export default function PostAccounts({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) {
  const [show, setShow] = useState(false);
  const { width } = useWindowSize();
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false));

  if (!addresses || addresses.length === 0) return null;

  return (
    <Wrapper>
      <SelectWrapper ref={ref}>
        <Select onClick={() => setShow(!show)}>
          <AccountWrapper>
            <Avatar address={selectedAddress} size={40} />
            <AccountDetail>
              <div>
                {width && width <= 1200
                  ? addressEllipsis(selectedAddress)
                  : selectedAddress}
              </div>
              <div>
                {width && width <= 1200
                  ? addressEllipsis(selectedAddress)
                  : selectedAddress}
              </div>
            </AccountDetail>
          </AccountWrapper>
          <CaretDown />
        </Select>
        {show && (
          <Option>
            {(addresses || []).map((item, index) => (
              <OptionItem
                key={index}
                onClick={() => {
                  setSelectedAddress(item);
                  setShow(false);
                }}
              >
                <AccountWrapper>
                  <Avatar address={item} size={40} />
                  <AccountDetail>
                    <div>
                      {width && width <= 1200 ? addressEllipsis(item) : item}
                    </div>
                    <div>
                      {width && width <= 1200 ? addressEllipsis(item) : item}
                    </div>
                  </AccountDetail>
                </AccountWrapper>
              </OptionItem>
            ))}
          </Option>
        )}
      </SelectWrapper>
    </Wrapper>
  );
}

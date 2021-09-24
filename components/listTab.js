import styled, { css } from "styled-components";
import { useState } from "react";

import { LIST_TAB_ITEMS } from "utils/constants";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  overflow-x: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 800px) {
    margin: 0 -20px;
    padding: 0 20px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 17px;
  :not(:first-child) {
    margin-left: 40px;
  }
  ${(p) =>
    p.active &&
    css`
      border-bottom: 3px solid #04d2c5;
    `}
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #04d2c5;
  margin-left: 40px;
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

export default function ListTab() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Wrapper>
      <ItemWrapper>
        {LIST_TAB_ITEMS.map((item, index) => (
          <Item
            key={index}
            active={tabIndex === index}
            onClick={() => setTabIndex(index)}
          >
            {item}
          </Item>
        ))}
      </ItemWrapper>
      <Button>
        <img src="/imgs/icons/add.svg" alt="" />
        New Proposal
      </Button>
    </Wrapper>
  );
}

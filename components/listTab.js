import styled, { css } from "styled-components";
import { useState } from "react";
import Link from "next/link";

import { LIST_TAB_ITEMS } from "utils/constants";
import { p_16_semibold } from "../styles/textStyles";
import { useSpace } from "utils/hooks";

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
  ${p_16_semibold};
  padding-bottom: 20px;
  :not(:first-child) {
    margin-left: 40px;
  }
  ${(p) =>
    p.active &&
    css`
      border-bottom: 3px solid #04d2c5;
      padding-bottom: 17px;
    `}
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${p_16_semibold};
  color: #04d2c5;
  margin-left: 40px;
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

export default function ListTab() {
  const space = useSpace();
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
      <Link href={`/space/${space}/create`} passHref>
        <Button>
          <img src="/imgs/icons/add.svg" alt="" />
          New Post
        </Button>
      </Link>
    </Wrapper>
  );
}

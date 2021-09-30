import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";

import { LIST_TAB_ITEMS } from "utils/constants";
import { p_16_semibold } from "../styles/textStyles";
import { useRouter } from "next/router";

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

export default function ListTab({ space, activeTab, onActiveTab = ()=>{} }) {
  const router = useRouter();
  const activeTabIndex = LIST_TAB_ITEMS.findIndex(item => item.value === activeTab);
  const [tabIndex, setTabIndex] = useState(activeTabIndex);

  useEffect(() => {
    const currTabIndex = LIST_TAB_ITEMS.findIndex(item => item.value === router.query.tab);
    setTabIndex(currTabIndex >= 0 ? currTabIndex : 0);
    onActiveTab(router.query.tab);
  }, [router, onActiveTab]);

  return (
    <Wrapper>
      <ItemWrapper>
        {LIST_TAB_ITEMS.map((item, index) => (
          <Item
            key={index}
            active={tabIndex === index}
            onClick={() => {
              router.push(
                {
                  query: {
                    space,
                    tab: item.value,
                    ...(item.page > 0 ? { page: item.page + 1 } : {}),
                  },
                },
                undefined,
                { shallow: true }
              );
              onActiveTab(item.value);
            }}
          >
            {item.name}
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

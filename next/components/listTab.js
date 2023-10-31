import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as QuestionMark } from "../public/imgs/icons/question-mark.svg";
import { LIST_TAB_ITEMS } from "frontedUtils/constants";
import { p_16_semibold } from "../styles/textStyles";
import { useRouter } from "next/router";
import Tooltip from "@/components/tooltip";
import { Flex, FlexBetween } from "@osn/common-ui";

const Wrapper = styled(FlexBetween)`
  align-items: flex-start;
  overflow-x: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-top: 100px;
  margin-top: -60px !important;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 800px) {
    margin-left: -20px;
    margin-right: -20px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: -80px !important;
  }
`;

const Item = styled.div`
  @media screen and (max-width: 800px) {
    position: relative;
  }
  overflow: visible;
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
  > div:last-child {
    margin-top: 4px;
    margin-left: 4px;
  }
`;

const NewPostLink = styled(Flex)`
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

export default function ListTab({
  spaceId,
  activeTab,
  onActiveTab = () => {},
  defaultPage,
}) {
  const router = useRouter();
  const activeTabIndex = LIST_TAB_ITEMS.findIndex(
    (item) => item.value === activeTab,
  );
  const [tabIndex, setTabIndex] = useState(activeTabIndex);

  useEffect(() => {
    const currTabIndex = LIST_TAB_ITEMS.findIndex(
      (item) => item.value === router.query.tab,
    );
    setTabIndex(currTabIndex >= 0 ? currTabIndex : 0);
    onActiveTab(router.query.tab);
  }, [router, onActiveTab]);

  return (
    <Wrapper>
      <Flex>
        {LIST_TAB_ITEMS.map((item, index) => (
          <Item
            key={index}
            active={tabIndex === index}
            onClick={() => {
              router.push(
                {
                  query: {
                    space: spaceId,
                    tab: item.value,
                    ...(item.value === defaultPage?.tab
                      ? defaultPage.page > 1
                        ? { page: defaultPage.page }
                        : {}
                      : {}),
                  },
                },
                undefined,
                { shallow: true },
              );
              onActiveTab(item.value);
            }}
          >
            {item.name}
            {item.tooltip && (
              <Tooltip content={item.tooltip}>
                <QuestionMark />
              </Tooltip>
            )}
          </Item>
        ))}
      </Flex>
      <a href={`/space/${spaceId}/create`}>
        <NewPostLink>
          <img src="/imgs/icons/add.svg" alt="" />
          New Proposal
        </NewPostLink>
      </a>
    </Wrapper>
  );
}

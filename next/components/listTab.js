import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as QuestionMark } from "../public/imgs/icons/question-mark.svg";
import { LIST_TAB_ITEMS } from "frontedUtils/constants";
import { p_16_semibold } from "../styles/textStyles";
import { useRouter } from "next/router";
import { Tooltip } from "@osn/common-ui";
import { Flex, FlexBetween } from "@osn/common-ui";
import { useSelector } from "react-redux";
import { loginAccountSelector } from "store/reducers/accountSlice";
import { isAdmin } from "frontedUtils/admin";
import { ReactComponent as SettingsSVG } from "../public/imgs/icons/setting.svg";

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
  display: flex;
  align-items: center;
  gap: 4px;
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
      border-bottom: 3px solid var(--strokeBgBrandSecondary);
      padding-bottom: 17px;
    `}
`;

const NewPostLink = styled(Flex)`
  cursor: pointer;
  ${p_16_semibold};
  color: var(--textBrandSecondary);
  > .img-div {
    display: inline-flex;
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

export default function ListTab({
  spaceId,
  space,
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

  const account = useSelector(loginAccountSelector);
  const isSpaceAdmin = isAdmin(space, account?.address);

  let settings = (
    <>
      <div>
        <SettingsSVG width={24} height={24} />
      </div>
      <span className="text16Semibold">Settings</span>
    </>
  );

  if (isSpaceAdmin) {
    settings = (
      <a href={`/space/${spaceId}/settings`}>
        <div className="flex gap-[8px] cursor-pointer [&_svg_path]:fill-textBrandSecondary text-textBrandSecondary">
          {settings}
        </div>
      </a>
    );
  } else {
    settings = (
      <Tooltip content="Only admins can change settings">
        <div className="flex gap-[8px] [&_svg_path]:fill-textQuaternary text-textQuaternary">
          {settings}
        </div>
      </Tooltip>
    );
  }

  return (
    <Wrapper>
      <Flex>
        {LIST_TAB_ITEMS.map((item, index) => (
          <Item
            role="button"
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
      <div className="flex items-center gap-[16px] ml-[32px]">
        {settings}

        <a href={`/space/${spaceId}/create`}>
          <NewPostLink>
            <div className="img-div">
              <img src="/imgs/icons/add.svg" alt="" />
            </div>
            New Proposal
          </NewPostLink>
        </a>
      </div>
    </Wrapper>
  );
}

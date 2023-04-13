import { useState } from "react";
import styled from "styled-components";
import Layout from "components/layout";
import { ssrNextApi } from "services/nextApi";
import Seo from "@/components/seo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import { Pagination, Container, List, Flex } from "@osn/common-ui";
import { clearUnread } from "store/reducers/notificationSlice";
import { accountSelector } from "store/reducers/accountSlice";
import NotificationItem from "../components/notification/notificationItem";
import NotificationTabs from "../components/notification/notificationTabs";
import { ReactComponent as CheckUnderline } from "@osn/common-ui/es/imgs/icons/check-underline.svg";
import { text_dark_minor } from "@osn/common-ui/es/styles/colors";
import { p_14_medium } from "@osn/common-ui/es/styles/textStyles";
import { useNotifications } from "hooks/notification/useNotifications";
import ListLoader from "@/components/notification/listLoader";

const Wrapper = styled.div`
  position: relative;
  padding: 0 0 64px;
`;

const ContentWrapper = styled.div`
  position: relative;
  margin: 20px 0;
`;

const ReadAllButton = styled(Flex)`
  color: ${text_dark_minor};
  ${p_14_medium};
  cursor: pointer;
`;

export default function Index({ allNetworks }) {
  const dispatch = useDispatch();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const account = useSelector(accountSelector);
  const [tab, setTab] = useState("notifications");
  const { isLoading, notifications, refresh } = useNotifications({
    page,
    pageSize,
  });

  useEffect(() => {
    dispatch(setAvailableNetworks(allNetworks || []));
  }, [dispatch, allNetworks]);

  const desc =
    "A list of notifications showing events happening in spaces you've joined.";
  return (
    <>
      <Seo desc={desc} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <Wrapper>
          <NotificationTabs
            items={[{ value: "notifications", suffix: notifications?.total }]}
            value={tab}
            setValue={setTab}
            extra={
              notifications?.items?.length > 0 && (
                <ReadAllButton
                  role="button"
                  onClick={() => {
                    dispatch(clearUnread(account.address));
                    // do refresh
                    refresh();
                  }}
                >
                  <CheckUnderline style={{ marginRight: 11 }} />
                  Mark all as read
                </ReadAllButton>
              )
            }
          />

          <Container>
            <ContentWrapper>
              <List
                gap={20}
                loading={isLoading}
                loadingComponent={<ListLoader />}
                data={notifications?.items}
                noDataMessage="No notifications"
                itemKey={(item) => `${item._id}_${item.read}`}
                itemRender={(item) => (
                  <List.Item>
                    <NotificationItem
                      data={item}
                      onMarkAsRead={(data) => {
                        dispatch(
                          clearUnread(account.address, {
                            items: [data._id],
                          }),
                        );
                      }}
                    />
                  </List.Item>
                )}
              />
            </ContentWrapper>

            <Pagination
              {...{ page, setPage, pageSize }}
              onChange={() => window.scrollTo(0, 0)}
              total={notifications?.total}
            />
          </Container>
        </Wrapper>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const [{ result: allNetworks }] = await Promise.all([
    ssrNextApi.fetch("networks"),
  ]);

  return {
    props: {
      allNetworks: allNetworks ?? [],
    },
  };
}

// copied from qa

import styled from "styled-components";
import { Tabs, Container } from "@osn/common-ui";
import { MOBILE_SIZE } from "@osn/constants";
import { netural_grey_200 } from "@osn/common-ui/es/styles/colors";

const TabsWrapper = styled.div`
  background-color: #fff;
  padding-top: 40px;
  border-bottom: 1px solid ${netural_grey_200};
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export default function NotificationTabs({ items, extra, value, setValue }) {
  return (
    <TabsWrapper>
      <Container>
        <Tabs items={items} value={value} setValue={setValue} extra={extra} />
      </Container>
    </TabsWrapper>
  );
}

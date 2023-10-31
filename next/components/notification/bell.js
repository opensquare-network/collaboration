import styled from "styled-components";
import Link from "next/link";
import { useSelector } from "react-redux";
import { unreadSelector } from "store/reducers/notificationSlice";
import { FlexCenter } from "@osn/common-ui";
import { ReactComponent as NotificationSVG } from "./notification.svg";
import { ReactComponent as UnreadNotificationSVG } from "./unread-notification.svg";
import { loginAddressSelector } from "store/reducers/accountSlice";

const Wrapper = styled(FlexCenter)`
  width: 38px;
  height: 38px;
  border: 1px solid #e2e8f0;

  &:hover {
    border-color: #b7c0cc;
  }

  cursor: pointer;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export default function NotificationBell() {
  const address = useSelector(loginAddressSelector);
  const unread = useSelector(unreadSelector);

  if (!address) {
    return null;
  }

  return (
    <Wrapper>
      <Link href="/notifications" passHref>
        {unread ? <UnreadNotificationSVG /> : <NotificationSVG />}
      </Link>
    </Wrapper>
  );
}

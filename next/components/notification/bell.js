import styled from "styled-components";
import Link from "next/link";
import { useSelector } from "react-redux";
import { unreadSelector } from "store/reducers/notificationSlice";
import { FlexCenter } from "@osn/common-ui";
import { ReactComponent as NotificationSVG } from "./notification.svg";
import { ReactComponent as UnreadNotificationSVG } from "./unread-notification.svg";

const Wrapper = styled(FlexCenter)`
  width: 38px;
  height: 38px;
  border: 1px solid #e2e8f0;

  &:hover {
    border-color: #b7c0cc;
  }

  cursor: pointer;
`;

export default function NotificationBell() {
  const unread = useSelector(unreadSelector);

  return (
    <Link href="/notifications" passHref>
      <a>
        <Wrapper>
          {unread
            ? <UnreadNotificationSVG />
            : <NotificationSVG />}
        </Wrapper>
      </a>
    </Link>
  );
}

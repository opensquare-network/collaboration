import Link from "next/link";
import { useSelector } from "react-redux";
import { unreadSelector } from "store/reducers/notificationSlice";
import { ReactComponent as NotificationSVG } from "./notification.svg";
import { ReactComponent as UnreadNotificationSVG } from "./unread-notification.svg";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { Button } from "@osn/common-ui";

export default function NotificationBell() {
  const address = useSelector(loginAddressSelector);
  const unread = useSelector(unreadSelector);

  if (!address) {
    return null;
  }

  return (
    <Link href="/notifications">
      <Button className="px-2">
        {unread ? <UnreadNotificationSVG /> : <NotificationSVG />}
      </Button>
    </Link>
  );
}

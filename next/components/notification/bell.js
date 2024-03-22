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
    <Link href="/notifications" className="max-sm:w-full">
      <Button className="px-2 w-full max-sm:px-4">
        <span className="w-full inline-flex items-center">
          {unread ? <UnreadNotificationSVG /> : <NotificationSVG />}
          <span className="sm:hidden ml-2">Notification</span>
        </span>
      </Button>
    </Link>
  );
}

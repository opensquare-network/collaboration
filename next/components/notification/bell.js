import Link from "next/link";
import { useSelector } from "react-redux";
import { unreadSelector } from "store/reducers/notificationSlice";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { Button } from "@osn/common-ui";
import {
  SystemNotification,
  SystemNotificationActive,
} from "@osn/icons/opensquare";

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
          {unread ? (
            <SystemNotificationActive className="text-textSecondary" />
          ) : (
            <SystemNotification className="text-textSecondary" />
          )}
          <span className="sm:hidden ml-2">Notification</span>
        </span>
      </Button>
    </Link>
  );
}

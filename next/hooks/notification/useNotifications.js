import { EmptyQuery } from "frontedUtils/constants";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { unreadSelector } from "store/reducers/notificationSlice";
import nextApi from "../../services/nextApi";

export function useNotifications({ page, pageSize }) {
  const [notifications, setNotifications] = useState(EmptyQuery);
  const [isLoading, setIsLoading] = useState(true);
  const address = useSelector(loginAddressSelector);
  const unread = useSelector(unreadSelector);
  const [prevUnread, setPrevUnread] = useState(unread);

  const refresh = useCallback(() => {
    if (!address) {
      return;
    }

    nextApi
      .fetch(`account/${address}/notifications`, { page, pageSize })
      .then(({ result }) => {
        if (result) {
          setNotifications(result);
        }
      });
  }, [address, page, pageSize]);

  useEffect(() => {
    if (!address) {
      return;
    }

    setIsLoading(true);

    nextApi
      .fetch(`account/${address}/notifications`, { page, pageSize })
      .then(({ result }) => {
        if (result) {
          setNotifications(result);
        } else {
          setNotifications(EmptyQuery);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [address, page, pageSize]);

  useEffect(() => {
    // Got new notifications
    if (unread > prevUnread) {
      refresh();
    }

    setPrevUnread(unread);
  }, [unread, prevUnread, refresh]);

  return { isLoading, notifications, refresh };
}

import { EmptyQuery } from "frontedUtils/constants";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loginAddressSelector } from "store/reducers/accountSlice";
import nextApi from "../../services/nextApi";

export function useNotifications({ page, pageSize }) {
  const [notifications, setNotifications] = useState(EmptyQuery);
  const [isLoading, setIsLoading] = useState(true);
  const address = useSelector(loginAddressSelector);

  const refresh = useCallback(() => {
    if (!address) {
      return;
    }

    nextApi
      .fetch(
        `account/${address}/notifications`,
        { page, pageSize },
      )
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
      .fetch(
        `account/${address}/notifications`,
        { page, pageSize },
      )
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

  return { isLoading, notifications, refresh };
}

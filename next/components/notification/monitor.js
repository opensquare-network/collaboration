import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUnread, fetchUnread } from "store/reducers/notificationSlice";
import { accountSelector } from "store/reducers/accountSlice";
import { connect } from "services/websocket";
import { toPublicKey } from "@osn/common";

export default function NotificationMonitor() {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(connect());
  }, []);

  // Fetch unread notifications on websocket push
  useEffect(() => {
    if (socket && account?.address && account?.network) {
      const publicKey = toPublicKey(account.address);

      const onNotification = () => {
        dispatch(fetchUnread(account.network, account.address));
      };

      const subscribe = () => {
        socket.emit("subscribe", { event: "notification", publicKey });
        socket.on("notification", onNotification);
      };

      if (socket.connected) {
        subscribe();
      } else {
        socket.on("connect", subscribe);
      }

      return () => {
        socket.emit("unsubscribe", { event: "notification", publicKey });
        socket.off("notification", onNotification);
      };
    }
  }, [dispatch, socket, account?.network, account?.address]);

  // Fetch unread notifications on logged in or mounted
  useEffect(() => {
    if (!account?.address || !account?.network) {
      dispatch(setUnread(0));
      return;
    }
    dispatch(fetchUnread(account.network, account.address));
  }, [dispatch, account?.address, account?.network]);

  return null;
}

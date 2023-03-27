import { createSlice } from "@reduxjs/toolkit";
import nextApi from "services/nextApi";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    unread: 0,
  },
  reducers: {
    setUnread(state, { payload }) {
      state.unread = payload;
    },
  },
});

export const { setUnread } = notificationSlice.actions;

export const unreadSelector = (state) => state.notification.unread;

export const fetchUnread = (address) => async (dispatch) => {
  nextApi
    .fetch(`account/${address}/notifications/unread`)
    .then(({ result }) => {
      if (result) {
        dispatch(setUnread(result.count));
      }
    });
};

export const clearUnread = (address, body) => async (dispatch) => {
  await nextApi
    .post(
      `account/${address}/notifications/clearunread`,
      body,
    )
    .then(({ result }) => {
      if (result) {
        dispatch(setUnread(0));
      }
    });
};

export default notificationSlice.reducer;

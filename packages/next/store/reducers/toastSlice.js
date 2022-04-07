import { createSlice } from "@reduxjs/toolkit";
import { TOAST_TYPES } from "../../frontedUtils/constants";

const MAX_TOASTS = 6;
let count = 0;

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    toasts: [],
  },
  reducers: {
    addToast(state, { payload }) {
      const toastId = count++;
      if (state.toasts.length >= MAX_TOASTS) {
        const i = state.toasts.findIndex((item) => !item.sticky);
        state.toasts.splice(i, 1);
      }
      state.toasts.push({ id: toastId, ...payload });
    },
    removeToast(state, { payload }) {
      state.toasts = state.toasts.filter((item) => item.id !== payload);
    },
    updateToast(state, { payload }) {
      state.toasts = state.toasts.map((t) => {
        if (t.id === payload.id) {
          return { ...t, ...payload };
        }
        return t;
      });
    },
  },
});

export const toastsSelector = (state) => state.toast.toasts;

export const { addToast, removeToast, updateToast } = toastSlice.actions;

export const newToastId = () => count++;

export const newPendingToast = (id, message) => (dispatch) => {
  dispatch(
    addToast({
      id,
      type: TOAST_TYPES.PENDING,
      message,
      sticky: true,
    })
  );
};

export const finishPendingToast = (id, successMessage) => (dispatch) => {
  dispatch(
    updateToast({
      id,
      type: TOAST_TYPES.SUCCESS,
      message: successMessage,
      sticky: false,
    })
  );

  setTimeout(() => {
    dispatch(removeToast(id));
  }, 10);
};

export default toastSlice.reducer;

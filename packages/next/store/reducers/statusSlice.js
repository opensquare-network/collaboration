import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    proxyBalanceLoading: false,
    balanceLoading: false,
    loadBalanceError: "",
  },
  reducers: {
    setProxyBalanceLoading(state, { payload }) {
      state.proxyBalanceLoading = payload;
    },
    setBalanceLoading(state, { payload }) {
      state.balanceLoading = payload;
    },
    setLoadBalanceError(state, { payload }) {
      state.loadBalanceError = payload;
    },
  },
});

export const {
  setProxyBalanceLoading,
  setBalanceLoading,
  setLoadBalanceError,
} = statusSlice.actions;

export const proxyBalanceLoadingSelector = (state) =>
  state.status.proxyBalanceLoading;
export const balanceLoadingSelector = (state) => state.status.balanceLoading;
export const loadBalanceErrorSelector = (state) =>
  state.status.loadBalanceError;

export default statusSlice.reducer;

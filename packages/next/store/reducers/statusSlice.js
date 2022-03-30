import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    proxyBalanceLoading: false,
    balanceLoading: false,
    createProposalLoading: false,
    loadBalanceError: "",
    showConnectModal: false,
  },
  reducers: {
    setProxyBalanceLoading(state, { payload }) {
      state.proxyBalanceLoading = payload;
    },
    setBalanceLoading(state, { payload }) {
      state.balanceLoading = payload;
    },
    setCreateProposalLoading(state, { payload }) {
      state.createProposalLoading = payload;
    },
    setLoadBalanceError(state, { payload }) {
      state.loadBalanceError = payload;
    },
    setShowConnectModal(state, { payload }) {
      state.showConnectModal = payload;
    },
  },
});

export const {
  setProxyBalanceLoading,
  setBalanceLoading,
  setLoadBalanceError,
  setCreateProposalLoading,
  setShowConnectModal,
} = statusSlice.actions;

export const proxyBalanceLoadingSelector = (state) =>
  state.status.proxyBalanceLoading;
export const balanceLoadingSelector = (state) => state.status.balanceLoading;
export const loadBalanceErrorSelector = (state) =>
  state.status.loadBalanceError;
export const createProposalLoadingSelector = (state) =>
  state.status.createProposalLoading;
export const showConnectModalConnector = (state) =>
  state.status.showConnectModal;

export default statusSlice.reducer;

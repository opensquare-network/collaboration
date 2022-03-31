import { createSlice } from "@reduxjs/toolkit";

const metamaskSlice = createSlice({
  name: "metamask",
  initialState: {
    chainId: null,
    address: null,
  },
  reducers: {
    setChainId(state, { payload }) {
      state.chainId = payload;
    },
    setAddress(state, { payload }) {
      state.address = payload;
    },
  },
});

export const {
  setChainId: setMetaMaskChainId,
  setAddress: setMetaMaskAddress,
} = metamaskSlice.actions;

export const metamaskChainIdSelector = (state) => {
  const chainId = parseInt(state.metamask.chainId);
  return isNaN(chainId) ? null : chainId;
};

export const metamaskAddrSelector = (state) => state.metamask.address;

export default metamaskSlice.reducer;

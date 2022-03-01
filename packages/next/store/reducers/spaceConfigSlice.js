import { createSlice } from "@reduxjs/toolkit";

const spaceConfigSlice = createSlice({
  name: "spaceConfig",
  initialState: {
    config: undefined,
  },
  reducers: {
    setSpaceConfig: (state, { payload }) => {
      if (payload) {
        state.config = payload;
      } else {
        state.config = null;
      }
    },
  },
});

export const { setSpaceConfig } = spaceConfigSlice.actions;

export const spaceConfigSelector = (state) => {
  if (state.spaceConfig.config) {
    return state.spaceConfig.config;
  }
  return null;
};

export const spaceSupportMultiChainSelector = state => {
  if (!state.spaceConfig.config) {
    return false
  }

  const networks = state.spaceConfig.config?.networks || [];
  return networks.length > 1;
}

export default spaceConfigSlice.reducer;

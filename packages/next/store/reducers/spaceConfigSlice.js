import { createSlice } from "@reduxjs/toolkit";

const spaceConfigSlice = createSlice({
  name: "spaceConfig",
  initialState: {
    spaceConfig: undefined,
  },
  reducers: {
    setSpaceConfig: (state, { payload }) => {
      if (payload) {
        state.spaceConfig = payload;
      } else {
        state.spaceConfig = null;
      }
    },
  },
});

export const { setSpaceConfig } = spaceConfigSlice.actions;

export const spaceConfigSelector = (state) => {
  if (state.spaceConfig.spaceConfig) {
    return state.spaceConfig.spaceConfig;
  }
  return null;
};

export default spaceConfigSlice.reducer;

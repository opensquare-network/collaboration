import { createSlice } from "@reduxjs/toolkit";

const snapshotHeightSlice = createSlice({
  name: "snapshotHeight",
  initialState: {
    snapshotHeight: undefined,
  },
  reducers: {
    setSnapshotHeight: (state, { payload }) => {
      if (payload) {
        state.snapshotHeight = payload;
      } else {
        state.snapshotHeight = null;
      }
    },
  },
});

export const { setSnapshotHeight } = snapshotHeightSlice.actions;

export const snapshotHeightSelector = (state) => {
  if (state.snapshotHeight.snapshotHeight) {
    return state.snapshotHeight.snapshotHeight;
  } else {
    return [];
  }
};

export default snapshotHeightSlice.reducer;

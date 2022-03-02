import { createSlice } from "@reduxjs/toolkit";

const snapshotHeightSlice = createSlice({
  name: "snapshotHeight",
  initialState: {
    snapshotHeights: [],
  },
  reducers: {
    setSnapshotHeights: (state, { payload }) => {
      if (payload) {
        state.snapshotHeights = payload;
      }
    },
  },
});

export const { setSnapshotHeights } = snapshotHeightSlice.actions;

export const snapshotHeightsSelector = (state) =>
  state.snapshotHeight.snapshotHeights;

export default snapshotHeightSlice.reducer;
